import { Request, Response } from 'express';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import UsersServices from '../services';

export default class UsersController {
  constructor(private services: UsersServices) {}

  async createUser(request: Request, response: Response): Promise<Response> {
    try {
      const createUserDTO: ICreateUserDTO = {
        firstName: request.body.firstName || '',
        lastName: request.body.lastName || '',
        birthDate: request.body.birthDate || '',
        city: request.body.city || '',
        country: request.body.country || '',
        email: request.body.email || '',
        password: request.body.password || '',
        confirmPassword: request.body.confirmPassword || ''
      };
      await this.services.createUserService.execute(createUserDTO);
      return response.status(201).json({
        message: 'success'
      });
    } catch (err: any) {
      return response.status(400).json({
        message: err.message || 'Unexpected error.'
      });
    }
  }
}
