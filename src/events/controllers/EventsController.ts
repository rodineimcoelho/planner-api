import { Request, Response } from 'express';
import ICreateEventDTO from '../dtos/ICreateEventDTO';
import EventsServices from '../services';

export default class EventsController {
  constructor(private services: EventsServices) {}

  private async getAllEvents(
    _request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const events = await this.services.getAllEventsService.execute();
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

      const events = await this.services.getEventsByDayOfTheWeekService.execute(
        dayOfTheWeek
      );

      return response.status(200).json(events);
    } catch (err: any) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      });
    }
  }

  async getEvents(request: Request, response: Response): Promise<Response> {
    const { dayOfTheWeek } = request.query;

    if (dayOfTheWeek) {
      return this.getEventsByDayOfTheWeek(request, response);
    }

    return this.getAllEvents(request, response);
  }

  async getEventById(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const event = await this.services.getEventByIdService.execute(id);

      if (typeof event === 'undefined') {
        return response.status(404).json({
          message: 'Event not found.'
        });
      }

      return response.status(200).json(event);
    } catch (err: any) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      });
    }
  }

  async createEvent(request: Request, response: Response): Promise<Response> {
    try {
      const createEventDTO: ICreateEventDTO = {
        description: request.body.description || '',
        dateTime: request.body.dateTime || ''
      };

      const newEvent = await this.services.createEventService.execute(
        createEventDTO
      );

      return response.status(201).json({
        message: 'success',
        createdEvent: newEvent.dto
      });
    } catch (err: any) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      });
    }
  }

  async deleteEventById(
    request: Request,
    response: Response
  ): Promise<Response> {
    try {
      const { id } = request.params;

      const deletedEvent = await this.services.deleteEventByIdService.execute(
        id
      );

      if (typeof deletedEvent === 'undefined') {
        return response.status(404).json({
          message: 'Event to delete not found.'
        });
      }

      return response.status(200).json({
        message: 'success',
        deletedEvent
      });
    } catch (err: any) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      });
    }
  }

  async deleteEventsByDayOfTheWeek(
    request: Request,
    response: Response
  ): Promise<Response> {
    if (!request.query.dayOfTheWeek) {
      return response.status(404).send({
        message: `Use ${request.originalUrl}?dayOfTheWeek={dayOfTheWeek} or ${request.originalUrl}:id to delete events.`
      });
    }

    try {
      const dayOfTheWeek = +request.query.dayOfTheWeek;

      const deletedEvents =
        await this.services.deleteEventsByDayOfTheWeekService.execute(
          dayOfTheWeek
        );

      return response.status(200).json({
        message: 'success',
        deletedEvents
      });
    } catch (err: any) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      });
    }
  }
}
