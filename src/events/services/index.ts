import IPlannerEventDTO from '../dtos/IPlannerEventDTO';
import IEventsRepository from '../repositories/IEventsRepository';
import GetAllEventsService from './GetAllEventsService';
import GetEventsByDayOfTheWeekService from './GetEventsByDayOfTheWeekService';

export default class EventsServices {
  public readonly getAllEventsService: GetAllEventsService;
  public readonly getEventsByDayOfTheWeekService: GetEventsByDayOfTheWeekService; 

  constructor(eventsRepository: IEventsRepository) {
    this.getAllEventsService = new GetAllEventsService(eventsRepository);
    this.getEventsByDayOfTheWeekService = new GetEventsByDayOfTheWeekService(eventsRepository);
  }
}
