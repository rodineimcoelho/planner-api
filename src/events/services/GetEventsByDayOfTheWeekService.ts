import IEventsRepository from '../repositories/IEventsRepository';
import PlannerEvent from '../entities/PlannerEvent';

export default class GetEventsByDayOfTheWeekService {
  constructor(private eventsRepository: IEventsRepository) {}

  private weekDelimiters(): {
    firstDateOfTheWeek: Date;
    lastDateOfTheWeek: Date;
  } {
    const today = new Date();
    const firstDayOfTheWeek = today.getDate() - today.getDay();

    const firstDateOfTheWeek = new Date(today);
    firstDateOfTheWeek.setDate(firstDayOfTheWeek);

    const lastDateOfTheWeek = new Date(today);
    lastDateOfTheWeek.setDate(firstDayOfTheWeek + 6);

    return { firstDateOfTheWeek, lastDateOfTheWeek };
  }

  private isFromCurrentWeek(date: Date) {
    const { firstDateOfTheWeek, lastDateOfTheWeek } = this.weekDelimiters();
    return date >= firstDateOfTheWeek && date <= lastDateOfTheWeek;
  }

  async execute(queryDayOfTheWeek: number) {
    const events: PlannerEvent[] = await this.eventsRepository.getAll();

    const filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.dateTime);
      const eventDayOfTheWeek = eventDate.getDay();
      const isQueriedDay = queryDayOfTheWeek === eventDayOfTheWeek;
      return isQueriedDay && this.isFromCurrentWeek(eventDate);
    });

    return filteredEvents;
  }
}