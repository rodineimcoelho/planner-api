import IEventsRepository from '../repositories/IEventsRepository';
import GetAllEventsService from './get/GetAllEventsService';
import GetEventByIdService from './get/GetEventByIdService';
import GetEventsByDayOfTheWeekService from './get/GetEventsByDayOfTheWeekService';
import CreateEventService from './post/CreateEventService';

export default class EventsServices {
  public readonly getAllEventsService: GetAllEventsService;
  public readonly getEventsByDayOfTheWeekService: GetEventsByDayOfTheWeekService;
  public readonly getEventByIdService: GetEventByIdService;
  public readonly createEventService: CreateEventService;

  constructor(eventsRepository: IEventsRepository) {
    this.getAllEventsService = new GetAllEventsService(eventsRepository);
    this.getEventsByDayOfTheWeekService = new GetEventsByDayOfTheWeekService(
      eventsRepository
    );
    this.getEventByIdService = new GetEventByIdService(eventsRepository);
    this.createEventService = new CreateEventService(eventsRepository);
  }
}
