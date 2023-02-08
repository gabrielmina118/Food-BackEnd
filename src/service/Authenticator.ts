import * as jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

class Authenticator {
  public static generateToken(id: string): string {
    const token = jwt.sign({ id }, process.env.JWT_KEY!, {
      expiresIn: "24h",
    });

    return token;
  }
}

export default Authenticator;
