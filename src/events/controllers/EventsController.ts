import { Request, Response } from 'express';
import GetAllEventsService from '../services/GetAllEventsService';
import GetEventsByDayOfTheWeekService from '../services/GetEventsByDayOfTheWeekService';

export default class EventsController {
  constructor(
    private getAllEventsService: GetAllEventsService,
    private getEventsByDayOfTheWeekService: GetEventsByDayOfTheWeekService
  ) {}

  async getEvents(request: Request, response: Response): Promise<Response> {
    const { dayOfTheWeek } = request.query;

    if (dayOfTheWeek) {
      return this.getEventsByDayOfTheWeek(request, response);
    }

    return this.getAllEvents(request, response);
  }

  private async getAllEvents(
    _request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const events = await this.getAllEventsService.execute();
      return response.status(200).json(events);
    } catch (err: any) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      });
    }
  }

  private async getEventsByDayOfTheWeek(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const dayOfTheWeek = +request.query.dayOfTheWeek!;

      if (isNaN(dayOfTheWeek))
        throw new Error('Day of the week is not a number');
      if (dayOfTheWeek < 0 || dayOfTheWeek > 6)
        throw new Error('The day of the week value must be between 0 and 6');

      const events = await this.getEventsByDayOfTheWeekService.execute(
        dayOfTheWeek
      );

      return response.status(200).json(events);
    } catch (err: any) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      });
    }
  }
}
