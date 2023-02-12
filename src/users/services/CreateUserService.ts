import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import Name from '../types/Name';

import {
  validateBirthDate,
  validateEmail,
  validateRequiredStringProperty
} from '../utils/UserValidators';

export default class CreateUserService {
  constructor(private userRepository: IUsersRepository) {}

  private validate(data: ICreateUserDTO) {
    validateRequiredStringProperty(data.firstName, 'First name');
    validateRequiredStringProperty(data.lastName, 'Last name');
    validateBirthDate(data.birthDate);
    validateRequiredStringProperty(data.city, 'City');
    validateRequiredStringProperty(data.country, 'Country');
    validateEmail(data.email);
    validateRequiredStringProperty(data.password, 'Password');
    validateRequiredStringProperty(
      data.confirmPassword,
      'Password confirmation'
    );

    if (data.password !== data.confirmPassword) {
      throw new Error("Passwords don't match");
    }
  }

  async execute(data: ICreateUserDTO): Promise<void> {
    this.validate(data);

    if (await this.userRepository.findByEmail(data.email)) {
      throw new Error('Email already in use.');
    }

    const name: Name = { fistName: data.firstName, lastName: data.lastName };
    const address: Address = { city: data.city, country: data.country };

    const newUser = new User(
      name,
      new Date(data.birthDate),
      address,
      data.email,
      data.password
    );

    return await this.userRepository.create(newUser);
  }
}
