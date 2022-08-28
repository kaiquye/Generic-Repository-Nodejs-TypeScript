import { codes } from './statusCodes';

export class HttpReturn<T> {
  private message: 'message not defined by administrator';
  public status = 500;
  private sucess = false;
  private object?: T;

  private constructor(message?, status?, sucess?, object?) {
    this.message = message;
    this.status = status;
    this.sucess = sucess;
    this.object = object;

    Object.freeze(this);
  }

  public static fail<Type>(message: Type, statusCodes: codes): any {
    throw new HttpReturn<Type>(message, statusCodes, false, {});
  }

  public static ok<Type>(message: Type, statusCodes: codes, value?: Type): any {
    return new HttpReturn<Type>(message, statusCodes, true, value);
  }
}
