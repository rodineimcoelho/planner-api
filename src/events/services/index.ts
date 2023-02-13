import IEventsRepository from '../repositories/IEventsRepository';
import DeleteEventByIdService from './delete/DeleteEventByIdService';
import DeleteEventsByDayOfTheWeekService from './delete/DeleteEventsByDayOfTheWeekService';
import GetAllEventsService from './get/GetAllEventsService';
import GetEventByIdService from './get/GetEventByIdService';
import GetEventsByDayOfTheWeekService from './get/GetEventsByDayOfTheWeekService';
import CreateEventService from './post/CreateEventService';

export default class EventsServices {
  public readonly getAllEventsService: GetAllEventsService;
  public readonly getEventsByDayOfTheWeekService: GetEventsByDayOfTheWeekService;
  public readonly getEventByIdService: GetEventByIdService;
  public readonly createEventService: CreateEventService;
  public readonly deleteEventByIdService: DeleteEventByIdService;
  public readonly deleteEventsByDayOfTheWeekService: DeleteEventsByDayOfTheWeekService;

  constructor(eventsRepository: IEventsRepository) {
    this.getAllEventsService = new GetAllEventsService(eventsRepository);

    this.getEventsByDayOfTheWeekService = new GetEventsByDayOfTheWeekService(
      eventsRepository
    );

    this.getEventByIdService = new GetEventByIdService(eventsRepository);
    this.createEventService = new CreateEventService(eventsRepository);
    this.deleteEventByIdService = new DeleteEventByIdService(eventsRepository);

    this.deleteEventsByDayOfTheWeekService =
      new DeleteEventsByDayOfTheWeekService(eventsRepository);
  }
}
