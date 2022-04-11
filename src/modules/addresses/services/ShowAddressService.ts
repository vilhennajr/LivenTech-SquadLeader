import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Address from '../infra/typeorm/entities/Address';
import { IShowAddress } from '../domain/models/IShowAddress';
import { IAddressesRepository } from '../domain/repositories/IAddressesRepository';

@injectable()
class ShowAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute({ id }: IShowAddress): Promise<Address> {
    const address = await this.addressesRepository.findById(id);

    if (!address) {
      throw new AppError('Address not found.');
    }

    return address;
  }
}

export default ShowAddressService;
