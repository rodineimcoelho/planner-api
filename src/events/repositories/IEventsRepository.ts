import PlannerEvent from '../entities/PlannerEvent';

export default interface IEventsRepository {
  getAll(): Promise<PlannerEvent[]>;
}
