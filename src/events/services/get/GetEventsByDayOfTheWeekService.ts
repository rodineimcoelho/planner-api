import IEventsRepository from '../../repositories/IEventsRepository';
import PlannerEvent from '../../entities/PlannerEvent';
import IGetEventDTO from '../../dtos/IGetEventDTO';

export default class GetEventsByDayOfTheWeekService {
  constructor(private eventsRepository: IEventsRepository) {}

  private weekDelimiters(): {
    firstDateOfTheWeek: Date;
    lastDateOfTheWeek: Date;
  } {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const firstDayOfTheWeek = today.getDate() - today.getDay();

    const firstDateOfTheWeek = new Date(
      todayYear,
      todayMonth,
      firstDayOfTheWeek
    );

    const lastDateOfTheWeek = new Date(
      todayYear,
      todayMonth,
      firstDayOfTheWeek + 7
    );

    lastDateOfTheWeek.setTime(lastDateOfTheWeek.getTime() - 1);

    return { firstDateOfTheWeek, lastDateOfTheWeek };
  }

  private isFromCurrentWeek(date: Date) {
    const { firstDateOfTheWeek, lastDateOfTheWeek } = this.weekDelimiters();
    return date >= firstDateOfTheWeek && date <= lastDateOfTheWeek;
  }

  async execute(queryDayOfTheWeek: number): Promise<IGetEventDTO[]> {
    const events: PlannerEvent[] = await this.eventsRepository.getAll();

    const filteredEvents = events.filter((event) => {
      const eventDate = new Date(event.dateTime);
      const eventDayOfTheWeek = eventDate.getDay();
      const isQueriedDay = queryDayOfTheWeek === eventDayOfTheWeek;
      return isQueriedDay && this.isFromCurrentWeek(eventDate);
    });

    return filteredEvents.map<IGetEventDTO>((event) => event.dto);
  }
}
