import { inject, injectable } from 'tsyringe';
import { IAddressesRepository } from '../domain/repositories/IAddressesRepository';
import { IAddressPaginate } from '../domain/models/IAddressPaginate';

@injectable()
class ListAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute(): Promise<IAddressPaginate> {
    const addresses = await this.addressesRepository.findAllPaginate();

    return addresses;
  }
}

export default ListAddressService;
