import Event from '../entities/Event';

export default interface IEventsRepository {
  getAll(): Promise<Event[]>
}