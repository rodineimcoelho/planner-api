import IEventsRepository from '../../repositories/IEventsRepository';
import IGetEventDTO from '../../dtos/IGetEventDTO';

export default class GetAllEventsService {
  constructor(private eventsRepository: IEventsRepository) {}

  async execute(): Promise<IGetEventDTO[]> {
    const events = await this.eventsRepository.getAll();
    return events.map<IGetEventDTO>((event) => event.dto);
  }
}
