import {Container} from "inversify";
import {ILogger} from "./logger/logger.interface";
import {LoggerService} from "./logger/logger.service";
import {TYPES} from "./types";
import {UserController} from "./users/userController";
import {App} from "./app";
import {IExceptionFilter} from "./errors/exception.filter.interface";
import {ExceptionFilter} from "./errors/exception.filter";
import {BaseController} from "./common/base.controller";

const appContainer = new Container();
appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
appContainer.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
appContainer.bind<BaseController>(TYPES.UserController).to(UserController);
appContainer.bind<App>(TYPES.Application).to(App);
const app = appContainer.get<App>(TYPES.Application);
app.init();

export {app, appContainer}
