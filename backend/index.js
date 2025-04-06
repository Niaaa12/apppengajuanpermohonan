const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// Mendapatkan semua pengajuan
app.get("/api/pengajuan", (req, res) => {
    db.query("SELECT * FROM pengajuan", (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Menambahkan pengajuan baru
app.post("/api/pengajuan", (req, res) => {
    const { nama, nik } = req.body;
    const sql = "INSERT INTO pengajuan (nama, nik) VALUES (?, ?)";
    db.query(sql, [nama, nik], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: result.insertId, nama, nik, status: "Diproses" });
    });
});

// Menjalankan server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
