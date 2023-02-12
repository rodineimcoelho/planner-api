import { Router } from 'express';
import EventsController from './controllers/EventsController';
import JsonEventsRepository from './repositories/implementations/JsonEventsRepository';
import EventsServices from './services';

const jsonEventsRepository = new JsonEventsRepository(
  `${__dirname}/../../data/events.json`
);

const eventsServices = new EventsServices(jsonEventsRepository);

const eventsController = new EventsController(eventsServices);

const router = Router();

router.get('/events', (request, response) => {
  return eventsController.getEvents(request, response);
});

export default router;
