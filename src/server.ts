import { createApp } from './app';

const host = process.env.HOST || '0.0.0.0';
const port = parseInt(process.env.PORT || '10', 10) || 3000;

const app = createApp();

app.listen(port, host, () => {
    console.log(`ToDo server running at http://${host}:${port}`);
});
