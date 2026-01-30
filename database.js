const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "refont-e-petitpas" // nom de mon  base donnée
});

db.connect((err) => {
    if (err) {
        console.error("Erreur connexion DB:", err);
    } else {
        console.log("Connecté à MySQL ✅");
    }
});

module.exports = database;




