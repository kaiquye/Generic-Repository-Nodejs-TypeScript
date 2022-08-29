import { codes } from '../enum/statusCodes';

export class HttpReturn<T> {
  public status = 500;
  private sucess = false;
  private message: 'message not defined by administrator';
  private object?: T;

  private constructor(message?, status?, sucess?, object?) {
    this.message = message;
    this.status = status;
    this.sucess = sucess;
    this.object = object;

    Object.freeze(this);
  }

  public static fail<Type>(message: string, statusCodes: codes): any {
    throw new HttpReturn<Type>(message, statusCodes, false, {});
  }

  public static ok<Type>(message: string, status: codes, value?: Type): any {
    return new HttpReturn<Type>(message, status, true, value);
  }
}
