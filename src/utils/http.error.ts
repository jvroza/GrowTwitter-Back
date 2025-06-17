export class HTTPError extends Error {
  public statusCode: number;

  constructor(statusCode: number, reason: string) {
    super(reason);
    this.statusCode = statusCode;
  }
}
