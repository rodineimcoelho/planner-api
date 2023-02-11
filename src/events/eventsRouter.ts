import { Router } from 'express';
import EventsController from './controllers/EventsController';
import JsonEventsRepository from './repositories/implementations/JsonEventsRepository';
import GetAllEventsService from './services/GetAllEventsService';
import GetEventsByDayOfTheWeekService from './services/GetEventsByDayOfTheWeekService';

const jsonEventsRepository = new JsonEventsRepository(
  `${__dirname}/../../data/events.json`
);

const getAllEventsService = new GetAllEventsService(jsonEventsRepository);

const getEventsByDayOfTheWeek = new GetEventsByDayOfTheWeekService(
  jsonEventsRepository
);

const eventsController = new EventsController(
  getAllEventsService,
  getEventsByDayOfTheWeek
);

const router = Router();

router.get('/events', (request, response) => {
  return eventsController.getEvents(request, response);
});

export default router;
