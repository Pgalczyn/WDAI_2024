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

const sqlTable = `CREATE TABLE IF NOT EXISTS books (

    ID_KSIAZKI INTEGER PRIMARY KEY AUTOINCREMENT,
    NAZWA TEXT NOT NULL,
    AUTOR TEXT NOT NULL,
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

app.get("/", (req, res) => {
  res.send("Witaj w mojej aplikacji Express!");
});

app.get("/api/books", (req, res) => {
  const sqlAll = `select * from books`;

  db.all(sqlAll, [], (err, rows) => {
    if (err) {
      console.error("Błąd podczas pobierania książek", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get("/api/books/:id", verifyToken, (req, res) => {
  const idBook = req.params.id;
  const sql = "SELECT * from books where ID_KSIAZKI = ? ";
  const param = [idBook];

  db.all(sql, param, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.json(rows);
  });
});

app.post("/api/books", (req, res) => {
  const { nazwa, autor, rok } = req.body;

  if (!nazwa || !autor || !rok) {
    res
      .status(400)
      .json({ error: "Wszystkie dane (nazwa, autor, rok) muszą być podane." });
  }

  const sql = "INSERT into books (nazwa,autor,rok) VALUES (?,?,?)";

  const params = [nazwa, autor, rok];

  db.run(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json({ id: this.lastID });
  });
});

app.delete("/api/books/:ID_ksiazka", (req, res) => {
  const id_book = req.params.ID_ksiazka;
  const sql = "DELETE from books where ID_KSIAZKI = ?";
  const param = [id_book];

  db.run(sql, param, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res
        .status(403)
        .json({ message: `Book with this ID does not exist` });
    }

    return res
      .status(200)
      .json({ message: `Book with ID: ${id_book} deleted` });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Serwer działa na http://localhost:${port}`);
});
