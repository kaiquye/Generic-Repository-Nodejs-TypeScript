export const PAYMENT_REQUERID = 402;
export const FORBIDEN = 403;
export const METHOD_NOT_ALLOWED = 405;
export const NOT_ACCEPTABLE = 406;
export const PROXY_AUTHENTICATION_REQUIRED = 407;
export const NOT_FOUND = 404;
export const CONFLICT = 409;
export const SERVER_ERROR = 500;

export const OK = 200;
export const CREATED = 201;
export const ACCEPTED = 202;
export const NON_AUTHORITATIVE_INFORMATION = 203;
export const NO_CONTENT = 204;
export const RESET_CONTENT = 205;
export const PARTIAL_CONTENT = 206;
export const MULTI_STATUS = 207;
export const ALREADY_REPORTED = 208;
export const IM_USED = 226;

export abstract class HttpStatusError {
  abstract NOT_FOUND;
  abstract UNAUTHORIZED;
  abstract PAYMENT_REQUERID;
  abstract FORBIDEN;
  abstract METHOD_NOT_ALLOWED;
  abstract NOT_ACCEPTABLE;
  abstract PROXY_AUTHENTICATION_REQUIRED;
  abstract CONFLICT;
  abstract SERVER_ERROR;
}

export abstract class HttpStatusSuccess {
  abstract OK;
  abstract CREATED;
  abstract ACCEPTED;
  abstract NON_AUTHORITATIVE_INFORMATION;
  abstract NO_CONTENT;
  abstract RESET_CONTENT;
  abstract PARTIAL_CONTENT;
  abstract MULTI_STATUS;
  abstract ALREADY_REPORTED;
  abstract IM_USED;
}
