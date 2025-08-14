const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE
router.post('/', async (req, res) => {
  const { nome, email, telefone } = req.body;
  try {
    await db.execute('INSERT INTO convidados (nome, email, telefone) VALUES (?, ?, ?)', [nome, email, telefone]);
    res.status(201).send('Convidado criado');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// READ ALL
router.get('/', async (req, res) => {
  try {
    const [guests] = await db.execute('SELECT * FROM convidados');
    res.json(guests);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// READ ONE
router.get('/:id', async (req, res) => {
  try {
    const [guest] = await db.execute('SELECT * FROM convidados WHERE id = ?', [req.params.id]);
    if (guest.length === 0) return res.status(404).send('Não encontrado');
    res.json(guest[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  const { name, email } = req.body;
  try {
    await db.execute('UPDATE convidados SET nome = ?, email = ?, telefone = ? WHERE id = ?', [nome, email, telefone, req.params.id]);
    res.send('Convidado atualizado');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await db.execute('DELETE FROM guests WHERE id = ?', [req.params.id]);
    res.send('Guest deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
