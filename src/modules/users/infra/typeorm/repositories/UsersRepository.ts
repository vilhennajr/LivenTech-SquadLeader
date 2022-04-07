import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { getRepository, Like, Repository } from 'typeorm';
import User from '../entities/User';
import { IPaginateUser } from '@modules/users/domain/models/IPaginateUser';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({ name, email, password }: ICreateUser): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async findAllPaginate(
    search: string,
    sortField: string,
  ): Promise<IPaginateUser> {
    if (search) {
      return (await this.ormRepository
        .createQueryBuilder()
        .where([{ name: Like(`%${search}%`) }, { email: Like(`%${search}%`) }])
        .orderBy(`User.name`, 'ASC')
        .paginate()) as IPaginateUser;
    }

    return (await this.ormRepository
      .createQueryBuilder()
      .orderBy('User.name', 'ASC')
      .paginate()) as IPaginateUser;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }
}

export default UsersRepository;
