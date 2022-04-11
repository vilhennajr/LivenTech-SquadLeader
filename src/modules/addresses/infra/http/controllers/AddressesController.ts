import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAddressService from '@modules/addresses/services/CreateAddressService';
import DeleteAddressService from '@modules/addresses/services/DeleteAddressService';
import ListAddressService from '@modules/addresses/services/ListAddressService';
import ShowAddressService from '@modules/addresses/services/ShowAddressService';
import UpdateAddressService from '@modules/addresses/services/UpdateAddressService';

export default class AddressesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAddresses = container.resolve(ListAddressService);

    const addresses = await listAddresses.execute();

    return response.json(addresses);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showAddress = container.resolve(ShowAddressService);

    const address = await showAddress.execute({ id });

    return response.json(address);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id, street, number, district, zipcode, city, state, country } =
      request.body;

    const createAddress = container.resolve(CreateAddressService);

    const address = await createAddress.execute({
      user_id,
      street,
      number,
      district,
      zipcode,
      city,
      state,
      country,
    });

    return response.json(address);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { street, number, district, zipcode, city, state, country } =
      request.body;
    const { id } = request.params;

    const updateAddress = container.resolve(UpdateAddressService);

    const address = await updateAddress.execute({
      id,
      street,
      number,
      district,
      zipcode,
      city,
      state,
      country,
    });

    return response.json(address);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteAddress = container.resolve(DeleteAddressService);

    await deleteAddress.execute({ id });

    return response.json([]);
  }
}
