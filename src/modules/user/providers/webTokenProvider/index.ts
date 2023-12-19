import { sign, verify } from "jsonwebtoken";
import { IWebTokenProvider } from "../../models/webTokenProvider.model";

class WebTokenProvider implements IWebTokenProvider {
  async create(userId: string): Promise<string> {
    const token = sign({}, `${process.env.JWT_SECRET}`, {
      subject: userId,
      expiresIn: "1d",
    });
    return token;
  }
  async verify(token: string) {
    const isValidToken = verify(token, `${process.env.JWT_SECRET}`);
    return isValidToken;
  }
}
export default WebTokenProvider;
