import { pbkdf2Sync } from 'crypto';

export function createHashedPassword(password: string) {
  return pbkdf2Sync(
    password,
    process.env.ADMIN_SALT!,
    Number(process.env.CRYPTO_ITERATIONS!),
    64,
    'sha512',
  ).toString('base64');
}

export function verifyPassword(password: string) {
  const hashedPassword = createHashedPassword(password);

  if (hashedPassword === process.env.ADMIN_HASHED_PASSWORD) {
    return true;
  }
  return false;
}
