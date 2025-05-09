const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require('multer');
const path = require('path');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '_' + Math.round(Math.random()*1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 10*1024*1024 },
  fileFilter: (req, file, cb) =>
    file.mimetype === 'application/pdf'
      ? cb(null, true)
      : cb(new Error('Hanya PDF yang diperbolehkan!'))
});
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
    process.exit(1);
  }
  console.log("Connected to MySQL database");
});
app.post('/api/pemohon/register', (req, res) => {
  const { name, email, password, phoneNumber } = req.body;

  if (!name || !email || !password || !phoneNumber) {
    return res.status(400).json({ message: 'Semua field harus diisi' });
  }

  // Cek apakah email sudah digunakan
  const checkQuery = 'SELECT id FROM users WHERE email = ?';
  db.query(checkQuery, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error saat cek email', error: err.message });
    }
    if (results.length > 0) {
      return res.status(409).json({ message: 'Email sudah terdaftar' });
    }

    // Hash password dan simpan user
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: 'Gagal mengenkripsi password', error: err.message });
      }

      const insertQuery = `
        INSERT INTO users (name, email, password_hash, phone)
        VALUES (?, ?, ?, ?)
      `;
      db.query(insertQuery, [name, email, hashedPassword, phoneNumber], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Gagal menyimpan user', error: err.message });
        }

        return res.status(201).json({ message: 'Registrasi berhasil', userId: result.insertId });
      });
    });
  });
});

app.post("/api/pemohon/login", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err.message });
    if (results.length === 0) {
      return res.status(401).json({ message: "Email atau password salah" });
    }
    const user = results[0];
    bcrypt.compare(password, user.password_hash, (compareErr, isMatch) => {
      if (compareErr) {
        return res.status(500).json({ message: "Error comparing passwords", error: compareErr.message });
      }
      if (!isMatch) {
        return res.status(401).json({ message: "Email atau password salah" });
      }
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      res.json({ token, user: { id: user.id, email: user.email, name: user.name || user.email } });
    });
  });
});
app.get('/api/pemohon/profile', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Token required' });
  }

  const token = authHeader.split(' ')[1]; // "Bearer <token>"

  // Decode tanpa verifikasi signature (untuk demo/project pribadi)
  const payload = jwt.decode(token);
  if (!payload || !payload.id) {
    return res.status(400).json({ message: 'Token invalid' });
  }

  // Query data user dari database
  const query = `
    SELECT
      id,
      email,
      name,
      phone AS phoneNumber
    FROM users
    WHERE id = ?
  `;

  db.query(query, [payload.id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error', error: err.message });
    }
    if (!results.length) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    // Return data profil
    res.json({ user: results[0] });
  });
});


// Endpoint grouped tanpa promise, menggunakan callback
app.get('/api/bantuan/grouped', (req, res) => {
  // 1. Fetch semua bantuan
  const sqlBantuan = `
    SELECT id, nama_bantuan, jenis_program
    FROM bantuan
    ORDER BY jenis_program, id
  `;
  db.query(sqlBantuan, (errB, bantuans) => {
    if (errB) {
      console.error(errB);
      return res.status(500).json({ message: 'Error fetching bantuan', error: errB.message });
    }
    // 2. Fetch semua persyaratan (umum + tambahan)
    const sqlPers = `
      SELECT bantuan_id, nama_persyaratan FROM persyaratan_umum
      UNION ALL
      SELECT bantuan_id, nama_persyaratan FROM persyaratan_tambahan
    `;
    db.query(sqlPers, (errP, persyaratans) => {
      if (errP) {
        console.error(errP);
        return res.status(500).json({ message: 'Error fetching persyaratan', error: errP.message });
      }
      // 3. Group persyaratan per bantuan_id
      const reqMap = {};
      persyaratans.forEach(row => {
        if (!reqMap[row.bantuan_id]) reqMap[row.bantuan_id] = [];
        reqMap[row.bantuan_id].push(row.nama_persyaratan);
      });
      // 4. Tambahkan requirements dan 5. Group menurut jenis_program
      const grouped = [];
      bantuans.forEach(b => {
        const item = {
          id: b.id,
          nama_bantuan: b.nama_bantuan,
          requirements: reqMap[b.id] || []
        };
        let grp = grouped.find(g => g.jenis_program === b.jenis_program);
        if (!grp) {
          grp = { jenis_program: b.jenis_program, subItems: [] };
          grouped.push(grp);
        }
        grp.subItems.push(item);
      });
      res.json(grouped);
    });
  });
});

// API Untuk Mendapatkan Persyaratan Program
app.get('/api/program/:id/requirements', (req, res) => {
  const jenisbantuanId = req.params.id;

  const sqlUmum = `SELECT nama_persyaratan FROM persyaratan_umum WHERE bantuan_id = ?`;
  const sqlTambahan = `SELECT nama_persyaratan FROM persyaratan_tambahan WHERE bantuan_id = ?`;

  // Jalankan dua query paralel
  db.query(sqlUmum, [jenisbantuanId], (err, umumResults) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: 'Database error (umum)',
        error: err.message
      });
    }

    db.query(sqlTambahan, [jenisbantuanId], (err, tambahanResults) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Database error (tambahan)',
          error: err.message
        });
      }

      if (umumResults.length === 0 && tambahanResults.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Program tidak ditemukan atau tidak ada persyaratan'
        });
      }

      const persyaratanUmum = umumResults.map(r => r.nama_persyaratan);
      const persyaratanTambahan = tambahanResults.map(r => r.nama_persyaratan);

      res.json({
        success: true,
        requirements: {
          umum: persyaratanUmum,
          tambahan: persyaratanTambahan
        }
      });
    });
  });
});

app.post('/api/pengajuan', upload.single('document'), (req, res) => {
  try {
    const {
      fullName,
      nik,
      kkNumber,
      placeOfBirth,
      birthDate,
      occupation,
      address,
      phoneNumber,
      bankName,
      accountNumber,
      jenisProgramId,
      bantuanId,
      hasReceivedAssistance,
      userId
    } = req.body;

    // 1. Validasi
    const errors = [];
    if (!fullName) errors.push('Nama lengkap harus diisi');
    if (!/^[0-9]{16}$/.test(nik)) errors.push('NIK harus 16 digit angka');
    if (!/^[0-9]{16}$/.test(kkNumber)) errors.push('KK harus 16 digit angka');
    if (!req.file) errors.push('File PDF wajib diunggah');
    if (errors.length) {
      return res.status(400).json({ success: false, message: 'Validasi gagal', errors });
    }

    // 2. Siapkan data
    const originalName = req.file.originalname;
    const fileName     = req.file.filename;

    // 3. Insert ke pengajuan_bantuan
    const sql1 = `
      INSERT INTO pengajuan_bantuan (
        full_name, nik, no_kk, tempat_lahir, tanggal_lahir,
        pekerjaan, alamat, no_hp, nama_bank, no_rekening,
        nama_file, path_file, belum_pernah_menerima, bantuan_id, user_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const vals1 = [
      fullName, nik, kkNumber, placeOfBirth, birthDate,
      occupation, address, phoneNumber, bankName, accountNumber,
      originalName, fileName, hasReceivedAssistance === 'true' ? 1 : 0,
 bantuanId, userId
    ];

    db.query(sql1, vals1, (err1, result1) => {
      if (err1) {
        console.error('DB Error (pengajuan_bantuan):', err1);
        return res.status(500).json({ success: false, message: 'Gagal menyimpan pengajuan', error: err1.message });
      }

      const pengajuanId = result1.insertId;

      // 4. Insert ke permohonan
      const sql2 = `
        INSERT INTO permohonan (
          pengajuan_id, user_id, bantuan_id
        ) VALUES (?, ?, ?)
      `;
      const vals2 = [pengajuanId, userId, bantuanId];

      db.query(sql2, vals2, (err2) => {
        if (err2) {
          console.error('DB Error (permohonan):', err2);
          return res.status(500).json({ success: false, message: 'Gagal menyimpan ke tabel permohonan', error: err2.message });
        }

        // 5. Balas sukses
        res.status(201).json({
          success: true,
          message: 'Pengajuan berhasil dikirim',
          data: { pengajuanId }
        });
      });
    });

  } catch (err) {
    console.error('Unexpected Error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.put('/api/pemohon/profile', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Token required' });
  }

  const token = authHeader.split(' ')[1];
  const payload = jwt.decode(token);

  if (!payload || !payload.id) {
    return res.status(400).json({ message: 'Token invalid' });
  }

  const { name, phoneNumber } = req.body;
  if (!name || !phoneNumber) {
    return res.status(400).json({ message: 'Name and phoneNumber are required' });
  }

  const query = `
    UPDATE users
    SET name = ?, phone = ?
    WHERE id = ?
  `;
  db.query(query, [name, phoneNumber, payload.id], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err.message });
    }

    db.query(
      'SELECT id, email, name, phone AS phoneNumber FROM users WHERE id = ?',
      [payload.id],
      (err2, rows) => {
        if (err2) {
          return res.status(500).json({ message: 'Database error', error: err2.message });
        }
        res.json({ message: 'Profile updated', user: rows[0] });
      }
    );
  });
});
app.put("/api/pemohon/change-password", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Token tidak ditemukan" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Token tidak valid" });

    const email = decoded.email;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Password lama dan baru harus diisi" });
    }

    // Cari user
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], (err, results) => {
      if (err) return res.status(500).json({ message: "Database error" });
      if (results.length === 0) return res.status(404).json({ message: "User tidak ditemukan" });

      const user = results[0];

      // Cek password lama
      bcrypt.compare(oldPassword, user.password_hash, (err, isMatch) => {
        if (err) return res.status(500).json({ message: "Error saat verifikasi password" });
        if (!isMatch) return res.status(401).json({ message: "Password lama salah" });

        // Hash password baru
        bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
          if (err) return res.status(500).json({ message: "Gagal mengenkripsi password baru" });

          const updateQuery = "UPDATE users SET password_hash = ? WHERE email = ?";
          db.query(updateQuery, [hashedPassword, email], (err) => {
            if (err) return res.status(500).json({ message: "Gagal update password" });
            return res.json({ message: "Password berhasil diubah" });
          });
        });
      });
    });
  });
});

// CEK STATUS: /api/cekstatus
app.get('/api/cekstatus', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Token required' });
  }

  const token = authHeader.split(' ')[1];
  let payload;
  try {
    // Verifikasi signature JWT
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' });
  }

  const userId = payload.id;
  const sql = `
    SELECT 
      p.id,
      pb.full_name AS nama,
      pb.nik,
      b.nama_bantuan,
      pb.submitted_at AS tanggal_pengajuan,
      p.status
    FROM permohonan p
    JOIN pengajuan_bantuan pb
      ON p.pengajuan_id = pb.id
    JOIN bantuan b
      ON pb.bantuan_id = b.id
    WHERE p.user_id = ?
    ORDER BY p.id DESC
  `;
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('DB Error (cekstatus):', err);
      return res.status(500).json({ message: 'Server error', error: err.message });
    }
    res.json(results);
  });
});

app.get('/api/bantuan/:jenisProgram', (req, res) => {
  const { jenisProgram } = req.params;
  let namaProgram = "";

  switch (jenisProgram.toLowerCase()) {
    case "dakwah":
      namaProgram = "Dakwah Dan Advokasi";
      break;
    case "pendidikan":
      namaProgram = "Pendidikan";
      break;
    case "kesehatan":
      namaProgram = "Kesehatan";
      break;
    case "kemanusiaan":
      namaProgram = "Kemanusiaan";
      break;
    case "ekonomi":
      namaProgram = "Ekonomi";
      break;
    default:
      return res.status(400).json({ message: "Jenis program tidak valid" });
  }

  const sql = `
    SELECT b.id, b.nama_bantuan, b.jenis_program, b.keterangan,
      (
        SELECT GROUP_CONCAT(nama_persyaratan SEPARATOR '|')
        FROM persyaratan_umum
        WHERE bantuan_id = b.id
      ) AS persyaratan_umum,
      (
        SELECT GROUP_CONCAT(nama_persyaratan SEPARATOR '|')
        FROM persyaratan_tambahan
        WHERE bantuan_id = b.id
      ) AS persyaratan_tambahan
    FROM bantuan b
    WHERE b.jenis_program = ?
  `;

  db.query(sql, [namaProgram], (err, results) => {
    if (err) {
      console.error('DB Error (api/bantuan/:jenisProgram):', err);
      return res.status(500).json({ message: 'Database error', error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Program tidak ditemukan' });
    }

    const formatted = results.map(row => ({
      id: row.id,
      nama_bantuan: row.nama_bantuan,
      jenis_program: row.jenis_program,
      keterangan: row.keterangan,
      persyaratan_umum: row.persyaratan_umum ? row.persyaratan_umum.split('|') : [],
      persyaratan_tambahan: row.persyaratan_tambahan ? row.persyaratan_tambahan.split('|') : [],
    }));

    res.json({ program: jenisProgram, judul: namaProgram, bantuan: formatted });
  });
});


app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
