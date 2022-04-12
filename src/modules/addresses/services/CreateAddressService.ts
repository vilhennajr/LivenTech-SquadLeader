import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { ICreateAddress } from '../domain/models/ICreateAddress';
import { IAddress } from '../domain/models/IAddress';
import { IAddressesRepository } from '../domain/repositories/IAddressesRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
@injectable()
class CreateAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    street,
    number,
    district,
    zipcode,
    city,
    state,
    country,
  }: ICreateAddress): Promise<IAddress> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const address = await this.addressesRepository.create({
      user_id,
      street,
      number,
      district,
      zipcode,
      city,
      state,
      country,
    });

    return address;
  }
}

export default CreateAddressService;
