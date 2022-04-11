import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IDeleteAddress } from '../domain/models/IDeleteAddress';
import { IAddressesRepository } from '../domain/repositories/IAddressesRepository';

@injectable()
class DeleteAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute({ id }: IDeleteAddress): Promise<void> {
    const address = await this.addressesRepository.findById(id);

    if (!address) {
      throw new AppError('Address not found.');
    }

    await this.addressesRepository.remove(address);
  }
}

export default DeleteAddressService;
