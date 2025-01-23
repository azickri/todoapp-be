import * as bcrypt from 'bcrypt';
import * as cryptoJS from 'crypto-js';

const SECRET_PHASE = process.env.SECRET_PHASE;

export class CryptHelper {
  static hashBcrypt(value: string) {
    return bcrypt.hash(value, 10);
  }

  static compareBcrypt(value: string, hashedString: string) {
    return bcrypt.compare(value, hashedString);
  }

  static encryptString(value: string) {
    return cryptoJS.AES.encrypt(value, SECRET_PHASE).toString();
  }

  static decryptString(value: string) {
    return cryptoJS.AES.decrypt(value, SECRET_PHASE).toString(
      cryptoJS.enc.Utf8,
    );
  }
}
