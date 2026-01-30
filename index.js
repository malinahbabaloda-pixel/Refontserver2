 const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Connexion MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "refont-e-petitpas"
});

db.connect(err => {
  if (err) {
    console.error("Erreur MySQL :", err);
  } else {
    console.log("Connecté à la base de données");
  }
});

// Route contact (backend)
app.post("/contact", (req, res) => {
  const { nom, mail, message } = req.body;

  if (!nom || !mail || !message) {
    return res.status(400).json({ message: "Tous les champs sont obligatoires" });
  }

  const sql = "INSERT INTO contact (nom, mail, message) VALUES (?, ?, ?)";
  db.query(sql, [nom, mail, message], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
    res.json({ message: "Message envoyé avec succès ✅" });
  });
});


// La fin d' API  pour le contact

app.post("/rappel", (req, res) => {
    const { nom, tel, mail, rappel, check } = req.body;
    const sql = "INSERT INTO demande_du_rappel (nom, tel, mail,rappel, `check`) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [nom, tel, mail, rappel, check], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json({ message: "Demande de rappel enregistrée !" });
    });
});





// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});


