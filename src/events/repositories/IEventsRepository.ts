import PlannerEvent from '../entities/PlannerEvent';

export default interface IEventsRepository {
  getAll(): Promise<PlannerEvent[]>;
  get(id: string): Promise<PlannerEvent | undefined>;
  create(event: PlannerEvent): Promise<void>;
  delete(id: string): Promise<PlannerEvent | undefined>;
}
