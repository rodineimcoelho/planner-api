import { Request, Response } from 'express';
import GetAllEventsService from '../services/GetAllEventsService';

export default class EventsController {
  constructor(private getAllEventsService: GetAllEventsService) {}

  async getAllEvents(request: Request, response: Response): Promise<Response> {
    try {
      const events = await this.getAllEventsService.execute();
      return response.status(200).json(events);
    } catch (err: any) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      });
    }
  }
}
