import { type } from 'os';
import ISignInDTO from '../dtos/ISignInDTO';
import User from '../entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import { validateRequiredStringProperty } from '../utils/UserValidators';

export default class SignInService {
  constructor(private usersRepository: IUsersRepository) {}

  private validate(data: ISignInDTO) {
    validateRequiredStringProperty(data.email, 'Email');
    validateRequiredStringProperty(data.password, 'Password');
  }

  async execute(data: ISignInDTO): Promise<User> {
    this.validate(data);

    const user = await this.usersRepository.findByEmail(data.email);

    if (typeof user === 'undefined') throw new Error('User not found.');
    
    if (!user.checkPassword(data.password))
      throw new Error('Incorrect password.');

    return user;
  }
}
