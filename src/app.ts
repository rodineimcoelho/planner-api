import express from 'express';
import eventsRouter from './events/eventsRouter';
import usersRouter from './users/usersRouter';

const app = express();

const routers = [eventsRouter, usersRouter];

app.set('json spaces', 2);
app.use(express.json());
app.use('/api/v1/', routers);

export default app;
