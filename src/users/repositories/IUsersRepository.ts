import User from '../entities/User';

export default interface IUsersRepository {
  create(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
}
