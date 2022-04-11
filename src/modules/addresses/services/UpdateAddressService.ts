import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IUpdateAddress } from '../domain/models/IUpdateAddress';
import Address from '../infra/typeorm/entities/Address';
import { IAddressesRepository } from '../domain/repositories/IAddressesRepository';

@injectable()
class UpdateAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
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
