import {
  validateDate,
  validateRequiredStringProperty
} from '../../../utils/Validators';
import ICreateEventDTO from '../../dtos/ICreateEventDTO';
import PlannerEvent from '../../entities/PlannerEvent';
import IEventsRepository from '../../repositories/IEventsRepository';

export default class CreateEventService {
  constructor(private eventsRepository: IEventsRepository) {}

  private validate(data: ICreateEventDTO) {
    validateRequiredStringProperty(data.description, 'Description');
    validateDate(data.dateTime, 'DateTime');
  }

  async execute(data: ICreateEventDTO): Promise<PlannerEvent> {
    this.validate(data);

    const newEvent = new PlannerEvent(
      data.description,
      new Date(data.dateTime),
      new Date()
    );

    await this.eventsRepository.create(newEvent);
    return newEvent;
  }
}
