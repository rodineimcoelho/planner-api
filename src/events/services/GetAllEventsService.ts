import IEventsRepository from '../repositories/IEventsRepository';
import IGetEventDTO from '../dtos/IGetEventDTO';
import Event from '../entities/Event';

export default class GetAllEventsService {
  constructor(private eventsRepository: IEventsRepository) {}

  async execute(): Promise<IGetEventDTO[]> {
    const events = await this.eventsRepository.getAll();
    return events.map<IGetEventDTO>((event) => ({
      _id: event.id,
      description: event.description,
      dateTime: event.dateTime.toISOString(),
      createdAt: event.createdAt.toISOString()
    }));
  }
}
