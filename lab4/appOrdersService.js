const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { json } = require("body-parser");

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
    QUANTITY TEXT NOT NULL
)`;
db.run(sqlTable, (err) => {
  if (err) {
    console.error("Błąd przy tworzeniu tabeli:", err);
  } else {
    console.log("Tabela została utworzona lub już istnieje");
  }
});

const sqlRows = "select count(*) as count_rows from orders";

db.get(sqlRows, (err, row) => {
  if (err) {
    console.error(err.message);
    return;
  }
  if (row.count_rows === 0) {
    const sqlAddCoupleRows = `
    INSERT INTO orders (ID_USER,QUANTITY) VALUES 
    (1,19),
    (49,2),
    (7,3)
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

app.get("/api/orders/:user_Id", (req, res) => {
  const user_Id = req.params.user_Id;
  const sql = "select * from orders where ID_USER = ?";

  const param = [user_Id];
  db.all(sql, [user_Id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.json(rows);
  });
});

app.post("/api/orders", verifyToken, (req, res) => {
  const { ID_USER, QUANTITY } = req.body;
  const params = [ID_USER, QUANTITY];

  const sql = `INSERT INTO orders (ID_USER,QUANTITY) VALUES (?,?)`;

  db.run(sql, params, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    return res.json({ ID_ZAMOWIENIA: this.lastID });
  });
});

app.delete("/api/orders/:id_zamowienia", verifyToken, (req, res) => {
  const id_zamowienia = req.params.id_zamowienia;

  const sql = "DELETE from orders where ID_ZAMOWIENIA = ?";

  db.run(sql, id_zamowienia, (err, rows) => {
    if (err) {
      return res.status(500), json({ error: err.message });
    }

    return res.json({ message: `zamowienie nr. ${id_zamowienia} usuniete` });
  });
});

app.patch("/api/orders/:id_zamowienia/:quantity", verifyToken, (req, res) => {
  const id_zamowienia = req.params.id_zamowienia;
  const quantity = req.params.quantity;
  const sql = "UPDATE orders SET QUANTITY = ? WHERE ID_ZAMOWIENIA = ?";
  const params = [quantity, id_zamowienia];

  db.run(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({ message: "Order updated successfully", changes: this.changes });
  });
});

app.listen(3002);
