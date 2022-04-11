import { inject, injectable } from 'tsyringe';
import { ICreateAddress } from '../domain/models/ICreateAddress';
import { IAddress } from '../domain/models/IAddress';
import { IAddressesRepository } from '../domain/repositories/IAddressesRepository';

@injectable()
class CreateAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
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
