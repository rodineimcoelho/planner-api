import Event from '../../entities/Event';
import IEventsRepository from '../IEventsRepository';
import fs from 'fs';
import IEventDTO from '../../dtos/IEventDTO';

export default class JsonEventsRepository implements IEventsRepository {
  private readonly jsonPath: string;
  private events!: Event[];

  constructor(jsonPath: string) {
    this.jsonPath = jsonPath;
    this.loadEvents();
  }

  private loadEvents() {
    const jsonString = fs.readFileSync(this.jsonPath, 'utf-8');
    const jsonEvents: IEventDTO[] = JSON.parse(jsonString);

    this.events = jsonEvents.map((jsonEvent) => {
      const dateTime = new Date(jsonEvent.dateTime);
      const createdAt = new Date(jsonEvent.createdAt);

      return new Event(
        jsonEvent.description,
        dateTime,
        createdAt,
        jsonEvent._id
      );
    });
  }

  async getAll(): Promise<Event[]> {
    return this.events;
  }
}
