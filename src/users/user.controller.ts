import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/http-error';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import 'reflect-metadata';
import { IUsersController } from './user.controller.interface';

class User {}

@injectable()
export class UserController extends BaseController implements IUsersController {
	private users: User[] = [];

	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/register', method: 'post', func: this.register },
			{ path: '/login', method: 'post', func: this.login },
		]);
	}

	public login(req: Request, res: Response, next: NextFunction): void {
		next(new HttpError(401, 'Not auth', 'login'));
	}

	public register(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'login');
	}
}
