import IPlannerEventDTO from '../dtos/IPlannerEventDTO';
import IEventsRepository from '../repositories/IEventsRepository';

export default class GetEventByIdService {
  constructor(private eventsRepository: IEventsRepository) {}

  async execute(id: string): Promise<IPlannerEventDTO | undefined> {
    const event = await this.eventsRepository.get(id);

    if (typeof event === 'undefined') return undefined;

    return {
      _id: event.id,
      description: event.description,
      dateTime: event.dateTime,
      createdAt: event.dateTime
    };
  }
}
