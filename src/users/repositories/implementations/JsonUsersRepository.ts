import fs from 'fs';
import fsPromises from 'fs/promises';
import validator from 'validator';
import User from '../../entities/User';
import Name from '../../types/Name';
import IUsersRepository from '../IUsersRepository';

interface IJsonUserDTO {
  id: string;
  name: Name;
  birthDate: Date;
  address: Address;
  _email: string;
  password: string;
}

export default class JsonUsersRepository implements IUsersRepository {
  private readonly jsonPath: string;
  private users!: User[];

  constructor(jsonPath: string) {
    this.jsonPath = jsonPath;
    this.loadUsers();
  }

  private loadUsers() {
    const jsonString = fs.readFileSync(this.jsonPath, 'utf-8');

    if (!validator.isEmpty(jsonString, { ignore_whitespace: true })) {
      const jsonUsers: IJsonUserDTO[] = JSON.parse(jsonString);

      this.users = jsonUsers.map(
        (jsonUser) =>
          new User(
            jsonUser.name,
            jsonUser.birthDate,
            jsonUser.address,
            jsonUser._email,
            jsonUser.password,
            jsonUser.id
          )
      );
    } else {
      this.users = [];
    }
  }

  async create(user: User): Promise<void> {
    this.users.push(user);
    const usersJson = JSON.stringify(this.users);
    return fsPromises.writeFile(this.jsonPath, usersJson);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
