import IEventsRepository from '../repositories/IEventsRepository';
import IEventDTO from '../dtos/IEventDTO';
import Event from '../entities/Event';

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
