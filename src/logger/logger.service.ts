import {ILogObj, Logger} from "tslog";

export class LoggerService {
    private logger: Logger<ILogObj>;

    constructor() {
        this.logger = new Logger<ILogObj>({name: "MyLogger"});
    }

    public log(...args: unknown[]) {
        this.logger.info(args);
    }

    public error(...args: unknown[]) {
        this.logger.error(args);
    }

    public warn(...args: unknown[]) {
        this.logger.warn(args);
    }
}
