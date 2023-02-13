import IUsersRepository from '../repositories/IUsersRepository';
import CreateUserService from './CreateUserService';
import SignInService from './SignInService';

export default class UsersServices {
  public readonly createUserService: CreateUserService;
  public readonly signInService: SignInService;

  constructor(usersRepository: IUsersRepository) {
    this.createUserService = new CreateUserService(usersRepository);
    this.signInService = new SignInService(usersRepository);
  }
}
