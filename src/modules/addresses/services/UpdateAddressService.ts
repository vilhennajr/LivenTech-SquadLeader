import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IUpdateAddress } from '../domain/models/IUpdateAddress';
import Address from '../infra/typeorm/entities/Address';
import { IAddressesRepository } from '../domain/repositories/IAddressesRepository';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
@injectable()
class UpdateAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    id,
    user_id,
    street,
    number,
    district,
    zipcode,
    city,
    state,
    country,
  }: IUpdateAddress): Promise<Address> {
    const address = await this.addressesRepository.findById(id);

    if (!address) {
      throw new AppError('Address not found.');
    }

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    address.user_id = user_id;
    address.street = street;
    address.number = number;
    address.district = district;
    address.zipcode = zipcode;
    address.city = city;
    address.state = state;
    address.country = country;

    await this.addressesRepository.save(address);

    return address;
  }
}

export default UpdateAddressService;
