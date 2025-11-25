const express = require('express');
const app = express();
const host = process.env.HOST || '0.0.0.0';
const port = parseInt(process.env.PORT, 10) || 3000;

app.use(express.json());

// В памяти храним задачи
let todos = [];
let nextId = 1;

// Получить все задачи
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Получить одну задачу по id
app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (!todo) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(todo);
});

// Добавить новую задачу
app.post('/todos', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    const newTodo = { id: nextId++, title, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Обновить задачу
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    if (!todo) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const { title, completed } = req.body;
    if (title !== undefined) {
        todo.title = title;
    }
    if (completed !== undefined) {
        todo.completed = completed;
    }

    res.json(todo);
});

// Удалить задачу
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const deleted = todos.splice(index, 1);
    res.json(deleted[0]);
});

// Запуск сервера
app.listen(port, host, () => {
    console.log(`ToDo server running at http://${host}:${port}`);
});
