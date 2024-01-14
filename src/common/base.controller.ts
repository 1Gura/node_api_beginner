import { Response, Router } from 'express';
import { ExpressReturnType, IControllerRoute } from './route.interface';
import { ILogger } from '../logger/logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { IMiddleware } from './middleware.interface';

//@ts-ignore
@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	protected constructor(private logger: ILogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public created(res: Response): ExpressReturnType {
		return res.sendStatus(201);
	}

	public send<T>(res: Response, code: number, message: T): ExpressReturnType {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 200, message);
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`[${route.method}] ${route.path}`);
			const middlewares = route.middlewares?.map((middleware: IMiddleware) =>
				middleware.execute.bind(middleware),
			);
			const handler = route.func.bind(this);
			const pipeLine = middlewares ? [...middlewares, handler] : handler;
			this.router[route.method](route.path, pipeLine);
		}
	}
}
