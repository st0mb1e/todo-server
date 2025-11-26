import request from 'supertest';
import { createApp } from '../src/app';

const app = createApp();

describe('Todo API', () => {
    let createdTodoId: number;

    // Добавляем новую задачу
    it('should create a new todo', async () => {
        const res = await request(app)
            .post('/todos')
            .send({ title: 'Test task' })
            .expect(201);

        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toBe('Test task');
        expect(res.body.completed).toBe(false);

        createdTodoId = res.body.id;
    });

    // Получаем все задачи
    it('should get all todos', async () => {
        const res = await request(app)
            .get('/todos')
            .expect(200);

        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    // Получаем задачу по id
    it('should get a single todo by id', async () => {
        const res = await request(app)
            .get(`/todos/${createdTodoId}`)
            .expect(200);

        expect(res.body.id).toBe(createdTodoId);
    });

    // Ошибка при несуществующем id
    it('should return 404 for non-existing todo', async () => {
        await request(app)
            .get('/todos/9999')
            .expect(404);
    });

    // Обновляем задачу
    it('should update a todo', async () => {
        const res = await request(app)
            .put(`/todos/${createdTodoId}`)
            .send({ title: 'Updated task', completed: true })
            .expect(200);

        expect(res.body.title).toBe('Updated task');
        expect(res.body.completed).toBe(true);
    });

    // Удаляем задачу
    it('should delete a todo', async () => {
        const res = await request(app)
            .delete(`/todos/${createdTodoId}`)
            .expect(200);

        expect(res.body.id).toBe(createdTodoId);

        // Проверяем, что задача удалена
        await request(app)
            .get(`/todos/${createdTodoId}`)
            .expect(404);
    });
});
