import express, { Request, Response } from 'express';

// Тип задачи
export interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

// Функция для создания приложения
export function createApp() {
    const app = express();
    app.use(express.json());

    let todos: Todo[] = [];
    let nextId = 1;

    app.get('/todos', (req: Request, res: Response) => {
        res.json(todos);
    });

    app.get('/todos/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        const todo = todos.find(t => t.id === id);
        if (!todo) return res.status(404).json({ error: 'Task not found' });
        res.json(todo);
    });

    app.post('/todos', (req: Request, res: Response) => {
        const { title } = req.body as { title?: string };
        if (!title) return res.status(400).json({ error: 'Title is required' });

        const newTodo: Todo = { id: nextId++, title, completed: false };
        todos.push(newTodo);
        res.status(201).json(newTodo);
    });

    app.put('/todos/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        const todo = todos.find(t => t.id === id);
        if (!todo) return res.status(404).json({ error: 'Task not found' });

        const { title, completed } = req.body as { title?: string; completed?: boolean };
        if (title !== undefined) todo.title = title;
        if (completed !== undefined) todo.completed = completed;

        res.json(todo);
    });

    app.delete('/todos/:id', (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        const index = todos.findIndex(t => t.id === id);
        if (index === -1) return res.status(404).json({ error: 'Task not found' });

        const [deleted] = todos.splice(index, 1);
        res.json(deleted);
    });

    return app;
}
