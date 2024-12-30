const express = require("express");
const jwt = require("jsonwebtoken");
const sqlite3 = require("sqlite3").verbose();
const dotenv = require("dotenv");
dotenv.config();

const db = new sqlite3.Database("./books.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error("Błąd połączenia z bazą danych:", err.message);
  console.log("Połączono z bazą danych.");
});

const app = express();
app.use(express.json());

const sqlTable = `CREATE TABLE IF NOT EXISTS users (

ID_USER INTEGER PRIMARY KEY AUTOINCREMENT,
E_mail TEXT NOT NULL,
Password TEXT NOT NULL
)`;
db.run(sqlTable, (err) => {
  if (err) {
    console.error("Błąd przy tworzeniu tabeli:", err);
  } else {
    console.log("Tabela została utworzona lub już istnieje");
  }
});

const sqlRows = "select count(*) as count_rows from users";

db.get(sqlRows, (err, row) => {
  if (err) {
    console.error(err.message);
    return;
  }
  if (row.count_rows === 0) {
    const sqlAddCoupleRows = `
    INSERT INTO users (E_mail,password) VALUES 
    ('kowalski@gmail.com', 'haslo1234')
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

const JWT_SECRET = process.env.JWT_SECRET;

function generateToken(user) {
  const payload = { id: user.ID_USER, email: user.E_mail };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

app.post("/api/register", (req, res) => {
  const { email, password } = req.body;
  const sql = `INSERT INTO users (E_mail,password) VALUES (?, ?)`;
  const params = [email, password];
  db.run(sql, params, (err) => {
    if (err) {
      console.error("Błąd podczas rejestracji:", err.message);
      return res.status(500).json({ error: "Błąd podczas rejestracji" });
    }
    res.status(201).json({ message: "Użytkownik zarejestrowany pomyślnie" });
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "Select * from users where E_mail = ? and Password = ? ";

  db.get(sql, [email, password], (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Błąd podczas logowania" });
    }

    if (!user) {
      return res.status(401).json({ error: "Nieprawidłowe dane logowania" });
    }

    const token = generateToken(user);
    res.json({ token });
  });
});

app.listen(3001);
