import PlannerEvent from '../../entities/PlannerEvent';
import IEventsRepository from '../IEventsRepository';
import fs from 'fs';
import IEventDTO from '../../dtos/IPlannerEventDTO';

export default class JsonEventsRepository implements IEventsRepository {
  private readonly jsonPath: string;
  private events!: PlannerEvent[];

  constructor(jsonPath: string) {
    this.jsonPath = jsonPath;
    this.loadEvents();
  }

  private loadEvents() {
    const jsonString = fs.readFileSync(this.jsonPath, 'utf-8');
    const jsonEvents: IEventDTO[] = JSON.parse(jsonString);

    this.events = jsonEvents.map((jsonEvent) => {
      return new PlannerEvent(
        jsonEvent.description,
        jsonEvent.dateTime,
        jsonEvent.createdAt,
        jsonEvent._id
      );
    });
  }

  async getAll(): Promise<PlannerEvent[]> {
    return this.events;
  }

  async get(id: string): Promise<PlannerEvent | undefined> {
    return this.events.find((event) => event.id === id);
  }
}
