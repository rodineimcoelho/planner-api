import PlannerEvent from '../../entities/PlannerEvent';
import IEventsRepository from '../IEventsRepository';
import fs from 'fs';
import fsPromises from 'fs/promises';
import IGetEventDTO from '../../dtos/IGetEventDTO';
import validator from 'validator';

export default class JsonEventsRepository implements IEventsRepository {
  private readonly jsonPath: string;
  private events!: PlannerEvent[];

  constructor(jsonPath: string) {
    this.jsonPath = jsonPath;
    this.loadEvents();
  }

  private loadEvents() {
    const jsonString = fs.readFileSync(this.jsonPath, 'utf-8');

    if (!validator.isEmpty(jsonString, { ignore_whitespace: true })) {
      const jsonEvents: IGetEventDTO[] = JSON.parse(jsonString);

      this.events = jsonEvents.map((jsonEvent) => {
        return new PlannerEvent(
          jsonEvent.description,
          jsonEvent.dateTime,
          jsonEvent.createdAt,
          jsonEvent._id
        );
      });
    } else {
      this.events = [];
    }
  }

  async getAll(): Promise<PlannerEvent[]> {
    return this.events;
  }

  async get(id: string): Promise<PlannerEvent | undefined> {
    return this.events.find((event) => event.id === id);
  }

  async create(event: PlannerEvent): Promise<void> {
    this.events.push(event);
    const eventsJson = JSON.stringify(this.events);
    return fsPromises.writeFile(this.jsonPath, eventsJson);
  }
}
