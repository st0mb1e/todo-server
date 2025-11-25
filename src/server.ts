import express, { Request, Response } from 'express';

const app = express();
const host = process.env.HOST || '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10) || 3000;

app.use(express.json());

// Тип для задачи
interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

// В памяти храним задачи
let todos: Todo[] = [];
let nextId = 1;

// Получить все задачи
app.get('/todos', (req: Request, res: Response) => {
    res.json(todos);
});

// Получить одну задачу по id
app.get('/todos/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const todo = todos.find(t => t.id === id);
    if (!todo) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(todo);
});

// Добавить новую задачу
app.post('/todos', (req: Request, res: Response) => {
    const { title } = req.body as { title?: string };
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    const newTodo: Todo = { id: nextId++, title, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Обновить задачу
app.put('/todos/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const todo = todos.find(t => t.id === id);
    if (!todo) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const { title, completed } = req.body as { title?: string; completed?: boolean };
    if (title !== undefined) {
        todo.title = title;
    }
    if (completed !== undefined) {
        todo.completed = completed;
    }

    res.json(todo);
});

// Удалить задачу
app.delete('/todos/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const [deleted] = todos.splice(index, 1);
    res.json(deleted);
});

// Запуск сервера
app.listen(port, host, () => {
    console.log(`ToDo server running at http://${host}:${port}`);
});
