import { ICreateUser } from '../models/ICreateUser';
import { IUser } from '../models/IUser';
import { IPaginateUser } from '../models/IPaginateUser';
export interface IUsersRepository {
  findByEmail(email: string): Promise<IUser | undefined>;
  create(data: ICreateUser): Promise<IUser>;
  findAllPaginate(search: string, sortField: string): Promise<IPaginateUser>;
  findById(id: string): Promise<IUser | undefined>;
}
