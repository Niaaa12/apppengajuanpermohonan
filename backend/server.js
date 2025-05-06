const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// Koneksi ke database MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// API Untuk Login
app.post("/api/user/login", (req, res) => {
  const { email, password } = req.body;

  // Cari user berdasarkan username
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [emaiil], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    const user = results[0];

    // Bandingkan password yang diinput dengan hash yang tersimpan
    bcrypt.compare(password, user.password_hash, (compareErr, isMatch) => {
      if (compareErr) {
        return res
          .status(500)
          .json({ message: "Error comparing passwords", error: compareErr });
      }

      if (!isMatch) {
        return res.status(401).json({ message: "Email atau password salah" });
      }

      // Buat token JWT dengan masa berlaku 1 jam
      const token = jwt.sign(
        { id: user.id, user: user.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      res.json({
        token,
        user: { id: user.id, user: user.email, name: user.email },
      });
    });
  });
});
