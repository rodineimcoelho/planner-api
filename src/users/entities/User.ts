import { v4 as uuid4 } from 'uuid';
import Name from '../types/Name';

export default class User {
  public readonly id: string;
  public name: Name;
  private birthDate: Date;
  public address: Address;
  private _email: string;
  private password: string;

  constructor(
    name: Name,
    birthDate: Date,
    address: Address,
    email: string,
    password: string,
    id?: string
  ) {
    this.name = name;
    this.birthDate = birthDate;
    this.address = address;
    this._email = email;
    this.password = password;

    if (id) {
      this.id = id;
    } else {
      this.id = uuid4();
    }
  }

  get email() {
    return this._email;
  }

  public checkPassword(password: string) {
    return this.password === password;
  }
}
