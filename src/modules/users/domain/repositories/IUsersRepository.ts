import { ICreateUser } from '../models/ICreateUser';
import { IUser } from '../models/IUser';

export interface IUsersRepository {
  create(data: ICreateUser): Promise<IUser>;
}
