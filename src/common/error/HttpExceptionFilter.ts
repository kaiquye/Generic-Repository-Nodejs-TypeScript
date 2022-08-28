import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpReturn } from './error';

@Catch(HttpReturn)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.status;

    console.log(status);
    console.log(exception);

    response.status(status).json({
      ...exception,
      teste: exception.status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
