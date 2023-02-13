import { v4 as uuidv4 } from 'uuid';
import IGetEventDTO from '../dtos/IGetEventDTO';

export default class PlannerEvent {
  public readonly id!: string;
  public description!: string;
  public dateTime!: Date;
  public readonly createdAt!: Date;

  constructor(
    description: string,
    dateTime: Date,
    createdAt: Date,
    id?: string
  ) {
    this.description = description;
    this.dateTime = dateTime;
    this.createdAt = createdAt;

    if (id) {
      this.id = id;
    } else {
      this.id = uuidv4();
    }
  }

  get dto(): IGetEventDTO {
    return {
      _id: this.id,
      description: this.description,
      dateTime: this.dateTime,
      createdAt: this.createdAt
    };
  }
}
