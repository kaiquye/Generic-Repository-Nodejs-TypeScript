export const NOT_FOUND = 500;
export const SERVER_ERROR = 500;
export const CONFLICT = 409;

export const OK = 200;
export const CREATED = 201;

export abstract class HttpStatusError {
  abstract CONFLICT;
  abstract NOT_FOUND;
  abstract SERVER_ERROR;
}

export abstract class HttpStatusSuccess {
  abstract CREATED;
  abstract OK;
}
