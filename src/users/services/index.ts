import IUsersRepository from '../repositories/IUsersRepository';
import CreateUserService from './CreateUserService';

export default class UsersServices {
  public readonly createUserService: CreateUserService;

  constructor(usersRepository: IUsersRepository) {
    this.createUserService = new CreateUserService(usersRepository);
  }
}
