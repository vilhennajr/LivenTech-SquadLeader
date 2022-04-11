import { ICreateAddress } from '../models/ICreateAddress';
import { IAddress } from '../models/IAddress';
import { IAddressPaginate } from '../models/IAddressPaginate';

export interface IAddressesRepository {
  findAllPaginate(): Promise<IAddressPaginate>;
  findById(id: string): Promise<IAddress | undefined>;
  create(data: ICreateAddress): Promise<IAddress>;
  save(address: IAddress): Promise<IAddress>;
  remove(address: IAddress): Promise<void>;
}
