import IEventsRepository from '../../repositories/IEventsRepository';
import PlannerEvent from '../../entities/PlannerEvent';
import IGetEventDTO from '../../dtos/IGetEventDTO';

export default class DeleteEventsByDayOfTheWeekService {
  constructor(private eventsRepository: IEventsRepository) {}

  async execute(queryDayOfTheWeek: number): Promise<IGetEventDTO[]> {
    if (isNaN(queryDayOfTheWeek))
      throw new Error('Day of the week is not a number.');

    if (queryDayOfTheWeek < 0 || queryDayOfTheWeek > 6)
      throw new Error('The day of the week value must be between 0 and 6.');

    const events: PlannerEvent[] =
      await this.eventsRepository.deleteByDayOfTheWeek(queryDayOfTheWeek);

    return events.map<IGetEventDTO>((event) => event.dto);
  }
}
