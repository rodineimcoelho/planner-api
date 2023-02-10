import { response, Router } from 'express';
import EventsController from './controllers/EventsController';
import JsonEventsRepository from './repositories/implementations/JsonEventsRepository';
import GetAllEventsService from './services/GetAllEventsService';

const getAllEventsService = new GetAllEventsService(
  new JsonEventsRepository(`${__dirname}/../../data/events.json`)
);

const eventsController = new EventsController(getAllEventsService);

const router = Router();

router.get('/events', (request, response) => {
  return eventsController.getAllEvents(request, response);
});

export default router;
