const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const db = new sqlite3.Database("./books.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error("Błąd połączenia z bazą danych:", err.message);
  console.log("Połączono z bazą danych.");
});

const app = express();
app.use(express.json());

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ error: "Token not provided" });
  }

  const tokenWithoutBear = token.split(" ")[1];

  jwt.verify(tokenWithoutBear, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = decoded;
    next();
  });
}

const sqlTable = `CREATE TABLE IF NOT EXISTS orders (

    ID_ZAMOWIENIA INTEGER PRIMARY KEY AUTOINCREMENT,
    ID_USER INTEGER NOT NULL,
    QUANTITY TEXT NOT NULL,
    ROK INTEGER

)`;
db.run(sqlTable, (err) => {
  if (err) {
    console.error("Błąd przy tworzeniu tabeli:", err);
  } else {
    console.log("Tabela została utworzona lub już istnieje");
  }
});

const sqlRows = "select count(*) as count_rows from books";

db.get(sqlRows, (err, row) => {
  if (err) {
    console.error(err.message);
    return;
  }
  if (row.count_rows === 0) {
    const sqlAddCoupleRows = `
    INSERT INTO books (nazwa, autor, rok) VALUES 
    ('Wojna i pokój', 'Lew Tołstoj', 1869),
    ('1984', 'George Orwell', 1949),
    ('Mistrz i Małgorzata', 'Michaił Bułhakow', 1967)
    `;

    db.run(sqlAddCoupleRows, (err) => {
      if (err) {
        console.error("Błąd przy dodawaniu wierszy: ", err);
      } else {
        console.log("Wiersze dodane pomyślnie");
      }
    });
  }
});
