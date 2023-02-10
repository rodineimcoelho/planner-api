import Event from '../../entities/Event';
import IEventsRepository from '../IEventsRepository';
import fs from 'fs/promises';
import IGetEventDTO from '../../dtos/IGetEventDTO';

export default class JsonEventsRepository implements IEventsRepository {
  constructor(private jsonPath: string) {}

  async getAll(): Promise<Event[]> {
    const jsonString = await fs.readFile(this.jsonPath, 'utf-8');
    const jsonEvents: IGetEventDTO[] = JSON.parse(jsonString);

    const events = jsonEvents.map((jsonEvent) => {
      const dateTime = new Date(jsonEvent.dateTime);
      const createdAt = new Date(jsonEvent.createdAt);

      return new Event(
        jsonEvent.description,
        dateTime,
        createdAt,
        jsonEvent._id
      );
    });

    return events;
  }
}
