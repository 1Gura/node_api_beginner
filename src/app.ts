import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import { UserController } from './users/user.controller';
import { ExceptionFilter } from './errors/exception.filter';

@injectable()
export class App {
	private app: Express;
	private server: Server;
	private port: number;

	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter,
	) {
		this.app = express();
		this.port = 8001;
	}

	public useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	public useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init(): Promise<void> {
		this.useRoutes();
		this.useExceptionFilters();
		this.server = this.app.listen(this.port);
		this.loggerService.log(`Сервер запущен: на порту ${this.port}`);
	}
}
