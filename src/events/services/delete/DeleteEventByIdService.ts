import IGetEventDTO from '../../dtos/IGetEventDTO';
import IEventsRepository from '../../repositories/IEventsRepository';

export default class DeleteEventByIdService {
  constructor(private eventsRepository: IEventsRepository) {}

  async execute(id: string): Promise<IGetEventDTO | undefined> {
    const deletedEvent = await this.eventsRepository.delete(id);

    if (typeof deletedEvent === 'undefined') return undefined;

    return deletedEvent.dto;
  }
}
