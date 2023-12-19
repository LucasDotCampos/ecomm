import { compare, hash } from "bcrypt";
import { IHashProvider } from "../../models/hashProvider.model";

class HashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export default HashProvider;
