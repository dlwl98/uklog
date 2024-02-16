export class KoreaDate extends Date {
  OFFSET = 1000 * 60 * 60 * 9;

  constructor() {
    super();
  }

  getKRTime() {
    return this.getTime() + this.OFFSET;
  }

  toKRString() {
    const krTime = this.getKRTime();
    return new Date(krTime)
      .toISOString()
      .split('.')[0]
      .replaceAll('-', '.')
      .replace('T', ' ');
  }
}
