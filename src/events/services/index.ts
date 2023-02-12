import IEventsRepository from '../repositories/IEventsRepository';
import GetAllEventsService from './GetAllEventsService';
import GetEventByIdService from './GetEventByIdService';
import GetEventsByDayOfTheWeekService from './GetEventsByDayOfTheWeekService';

export default class EventsServices {
  public readonly getAllEventsService: GetAllEventsService;
  public readonly getEventsByDayOfTheWeekService: GetEventsByDayOfTheWeekService;
  public readonly getEventByIdService: GetEventByIdService;

  constructor(eventsRepository: IEventsRepository) {
    this.getAllEventsService = new GetAllEventsService(eventsRepository);
    this.getEventsByDayOfTheWeekService = new GetEventsByDayOfTheWeekService(
      eventsRepository
    );
    this.getEventByIdService = new GetEventByIdService(eventsRepository);
  }
}
