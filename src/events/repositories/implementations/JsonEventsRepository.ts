import PlannerEvent from '../../entities/PlannerEvent';
import IEventsRepository from '../IEventsRepository';
import fs from 'fs';
import fsPromises from 'fs/promises';
import validator from 'validator';
import { isFromCurrentWeek } from '../../../utils/Week';

interface IEventJsonDTO {
  id: string;
  description: string;
  dateTime: string;
  createdAt: string;
}

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
      const jsonEvents: IEventJsonDTO[] = JSON.parse(jsonString);

      this.events = jsonEvents.map(
        (jsonEvent) =>
          new PlannerEvent(
            jsonEvent.description,
            new Date(jsonEvent.dateTime),
            new Date(jsonEvent.createdAt),
            jsonEvent.id
          )
      );
    } else {
      this.events = [];
    }
  }

  async getAll(): Promise<PlannerEvent[]> {
    return this.events;
  }

  async getByDayOfTheWeek(dayOfTheWeek: number): Promise<PlannerEvent[]> {
    return this.events.filter((event) => {
      const eventDate = new Date(event.dateTime);
      const eventDayOfTheWeek = eventDate.getDay();
      const isQueriedDay = dayOfTheWeek === eventDayOfTheWeek;
      return isQueriedDay && isFromCurrentWeek(eventDate);
    });
  }

  async get(id: string): Promise<PlannerEvent | undefined> {
    return this.events.find((event) => event.id === id);
  }

  async create(event: PlannerEvent): Promise<void> {
    this.events.push(event);
    const eventsJson = JSON.stringify(this.events, null, 2);
    return fsPromises.writeFile(this.jsonPath, eventsJson);
  }

  async delete(id: string): Promise<PlannerEvent | undefined> {
    const eventIndex = this.events.findIndex((event) => event.id === id);

    if (eventIndex === -1) return undefined;

    const deletedEvent = this.events.splice(eventIndex, 1)[0];

    console.log(this.events[eventIndex]);

    const eventsJson = JSON.stringify(this.events, null, 2);
    await fsPromises.writeFile(this.jsonPath, eventsJson);

    return deletedEvent;
  }

  async deleteByDayOfTheWeek(dayOfTheWeek: number): Promise<PlannerEvent[]> {
    const deletedEvents = await this.getByDayOfTheWeek(dayOfTheWeek);
    this.events = this.events.filter((event) => !deletedEvents.includes(event));

    const eventsJson = JSON.stringify(this.events, null, 2);
    await fsPromises.writeFile(this.jsonPath, eventsJson);

    return deletedEvents;
  }
}
