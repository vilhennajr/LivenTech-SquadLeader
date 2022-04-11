import { ICreateAddress } from '@modules/addresses/domain/models/ICreateAddress';
import { IAddressPaginate } from '@modules/addresses/domain/models/IAddressPaginate';
import { IAddressesRepository } from '@modules/addresses/domain/repositories/IAddressesRepository';
import { getRepository, Repository } from 'typeorm';
import Address from '../entities/Address';

class AddressesRepository implements IAddressesRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async create({
    user_id,
    street,
    number,
    district,
    zipcode,
    city,
    state,
    country,
  }: ICreateAddress): Promise<Address> {
    const address = this.ormRepository.create({
      user_id,
      street,
      number,
      district,
      zipcode,
      city,
      state,
      country,
    });

    await this.ormRepository.save(address);

    return address;
  }

  public async save(address: Address): Promise<Address> {
    await this.ormRepository.save(address);

    return address;
  }

  public async remove(address: Address): Promise<void> {
    await this.ormRepository.remove(address);
  }

  public async findAllPaginate(): Promise<IAddressPaginate> {
    const addresses = await this.ormRepository.createQueryBuilder().paginate();

    return addresses as IAddressPaginate;
  }

  public async findById(id: string): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return address;
  }
}

export default AddressesRepository;
