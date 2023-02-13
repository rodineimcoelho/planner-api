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

router.get('/events/:id', (request, response) => {
  return eventsController.getEventById(request, response);
});

router.post('/events', (request, response) => {
  return eventsController.createEvent(request, response);
});

router.delete('/events/:id', (request, response) => {
  return eventsController.deleteEventById(request, response);
});

export default router;
