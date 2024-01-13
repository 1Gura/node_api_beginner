import { NextFunction, Request, Response } from 'express';
import { IExceptionFilter } from './exception.filter.interface';
import { HttpError } from './http-error';
import { ILogger } from '../logger/logger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import 'reflect-metadata';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

	public catch(err: Error | HttpError, request: Request, response: Response, next: NextFunction): void {
		if (err instanceof HttpError) {
			this.logger.error(`[${err.context}] Ошибка ${err.statusCode} ${err.message}`);
			response.status(err.statusCode).send({ err: err.message });
		} else {
			this.logger.error(`${err.message}`);
			response.status(500).send({ err: err.message });
		}
	}
}
