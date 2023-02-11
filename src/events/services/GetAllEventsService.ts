import IEventsRepository from '../repositories/IEventsRepository';
import IEventDTO from '../dtos/IPlannerEventDTO';

export default class GetAllEventsService {
  constructor(private eventsRepository: IEventsRepository) {}

  async execute(): Promise<IEventDTO[]> {
    const events = await this.eventsRepository.getAll();
    return events.map<IEventDTO>((event) => ({
      _id: event.id,
      description: event.description,
      dateTime: event.dateTime,
      createdAt: event.createdAt
    }));
  }
}
