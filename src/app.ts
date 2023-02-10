import express from 'express';
import eventsRouter from './events/eventsRouter';

const app = express();

app.set('json spaces', 2);
app.use('/api/v1/', eventsRouter);

export default app;
