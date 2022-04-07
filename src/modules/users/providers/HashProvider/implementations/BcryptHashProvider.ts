import { compare, hash } from 'bcryptjs';
import { IHashProvider } from '../models/IHashPovider';

class BcryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }
}

export default BcryptHashProvider;
