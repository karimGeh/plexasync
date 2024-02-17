import bcrypt from "bcrypt";

export class Password {
  static async toHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
  }

  static async compare(
    hashedPassword: string,
    suppliedPassword: string
  ): Promise<boolean> {
    const verification = await bcrypt.compare(suppliedPassword, hashedPassword);
    return verification;
  }
}
