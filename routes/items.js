const express = require("express");
const router = express.Router();
const db = require("../db/connection.js");

// Create
router.post("/items", async (req, res) => {
  const { name, description } = req.body;
  try {
    const [result] = await db.execute(
      "INSERT INTO items (name, description) VALUES (?, ?)",
      [name, description]
    );
    res.status(201).json({ id: result.insertId, name, description });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read
router.get("/users", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
router.put("/items/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    await db.execute(
      "UPDATE items SET name = ?, description = ? WHERE id = ?",
      [name, description, id]
    );
    res.json({ id, name, description });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
router.delete("/items/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM items WHERE id = ?", [id]);
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
