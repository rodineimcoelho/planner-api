import IGetEventDTO from '../../dtos/IGetEventDTO';
import IEventsRepository from '../../repositories/IEventsRepository';

export default class GetEventByIdService {
  constructor(private eventsRepository: IEventsRepository) {}

  async execute(id: string): Promise<IGetEventDTO | undefined> {
    const event = await this.eventsRepository.get(id);

    if (typeof event === 'undefined') return undefined;

    return event.dto;
  }
}
