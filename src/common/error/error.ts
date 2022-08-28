import {
  ACCEPTED,
  ALREADY_REPORTED,
  CONFLICT,
  CREATED,
  FORBIDEN,
  HttpStatusError,
  HttpStatusSuccess,
  IM_USED,
  METHOD_NOT_ALLOWED,
  MULTI_STATUS,
  NO_CONTENT,
  NON_AUTHORITATIVE_INFORMATION,
  NOT_ACCEPTABLE,
  NOT_FOUND,
  OK,
  PARTIAL_CONTENT,
  PAYMENT_REQUERID,
  PROXY_AUTHENTICATION_REQUIRED,
  RESET_CONTENT,
  SERVER_ERROR,
} from './statusCodes';

export class HttpReturn<T> {
  private message: 'message not defined by administrator';
  private status = 500;
  private sucess = false;
  private object?: T;

  private constructor(message?, status?, sucess?, object?) {
    this.message = message;
    this.status = status;
    this.sucess = sucess;
    this.object = object;

    Object.freeze(this);
  }

  static fail<Type>(message: string | object | Type): HttpStatusError {
    return {
      CONFLICT: (() => {
        throw new HttpReturn<Type>(message, CONFLICT, false, {});
      })(),
      NOT_FOUND: (() => {
        throw new HttpReturn<Type>(message, NOT_FOUND, false, {});
      })(),
      SERVER_ERROR: (() => {
        throw new HttpReturn<Type>(message, SERVER_ERROR, false, {});
      })(),
      FORBIDEN: (() => {
        throw new HttpReturn<Type>(message, FORBIDEN, false, {});
      })(),
      METHOD_NOT_ALLOWED: (() => {
        throw new HttpReturn<Type>(message, METHOD_NOT_ALLOWED, false, {});
      })(),
      NOT_ACCEPTABLE: (() => {
        throw new HttpReturn<Type>(message, NOT_ACCEPTABLE, false, {});
      })(),
      PAYMENT_REQUERID: (() => {
        throw new HttpReturn<Type>(message, PAYMENT_REQUERID, false, {});
      })(),
      PROXY_AUTHENTICATION_REQUIRED: (() => {
        throw new HttpReturn<Type>(
          message,
          PROXY_AUTHENTICATION_REQUIRED,
          false,
          {},
        );
      })(),
      UNAUTHORIZED: (() => {
        throw new HttpReturn<Type>(message, NOT_FOUND, false, {});
      })(),
    };
  }

  static ok<Type>(message: string | Type, value: Type): HttpStatusSuccess {
    return {
      OK: (() => {
        return new HttpReturn<Type>(message, OK, true, value);
      })(),
      CREATED: (() => {
        return new HttpReturn<Type>(message, CREATED, true, value);
      })(),
      ACCEPTED: (() => {
        return new HttpReturn<Type>(message, ACCEPTED, true, value);
      })(),
      IM_USED: (() => {
        return new HttpReturn<Type>(message, IM_USED, true, value);
      })(),
      MULTI_STATUS: (() => {
        return new HttpReturn<Type>(message, MULTI_STATUS, true, value);
      })(),
      NO_CONTENT: (() => {
        return new HttpReturn<Type>(message, NO_CONTENT, true, value);
      })(),
      ALREADY_REPORTED: (() => {
        return new HttpReturn<Type>(message, ALREADY_REPORTED, true, value);
      })(),
      NON_AUTHORITATIVE_INFORMATION: (() => {
        return new HttpReturn<Type>(
          message,
          NON_AUTHORITATIVE_INFORMATION,
          true,
          value,
        );
      })(),
      RESET_CONTENT: (() => {
        return new HttpReturn<Type>(message, RESET_CONTENT, true, value);
      })(),
      PARTIAL_CONTENT: (() => {
        return new HttpReturn<Type>(message, PARTIAL_CONTENT, true, value);
      })(),
    };
  }
}
