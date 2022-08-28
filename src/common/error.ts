import {
  CONFLICT,
  CREATED,
  HttpStatusError,
  HttpStatusSuccess,
  NOT_FOUND,
  OK,
  SERVER_ERROR,
} from './status';

export class Result<T> {
  private message: 'message not defined by administrator';
  private status = 500;
  private sucess = false;
  private object?: T;

  constructor(message?, status?, sucess?, object?) {
    this.message = message;
    this.status = status;
    this.sucess = sucess;
    this.object = object;

    Object.freeze(this);
  }

  static fail<Type>(message: string | object | Type): HttpStatusError {
    return {
      CONFLICT: (() => {
        throw new Result<Type>(message, CONFLICT, false);
      })(),
      NOT_FOUND: (() => {
        throw new Result<Type>(message, NOT_FOUND, false);
      })(),
      SERVER_ERROR: (() => {
        throw new Result<Type>(message, SERVER_ERROR, false);
      })(),
    };
  }

  static success<Type>(message: string | object | Type): HttpStatusSuccess {
    return {
      CREATED: (() => {
        return new Result<Type>(message, CREATED);
      })(),
      OK: (() => {
        return new Result<Type>(message, OK);
      })(),
    };
  }
}
