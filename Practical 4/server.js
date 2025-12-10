// server.js

const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory "database" for our todos
let todos = [];
let nextId = 1;

// POST /todos → add a todo
app.post('/todos', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).send({ error: 'Title is required' });
    }
    const newTodo = {
        id: nextId++,
        title,
        completed: false
    };
    todos.push(newTodo);
    res.status(201).send(newTodo);
});

// GET /todos → list todos
app.get('/todos', (req, res) => {
    res.status(200).send(todos);
});

// Start the server
app.listen(port, () => {
    console.log(`To-Do API listening at http://localhost:${port}`);
});
