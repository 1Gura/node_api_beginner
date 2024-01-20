import { IConfigService } from './config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
import { inject, injectable } from 'inversify';
import { LoggerService } from '../logger/logger.service';
import { TYPES } from '../types';

@injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;

	constructor(@inject(TYPES.ILogger) private logger: LoggerService) {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('Не удалось прочитать файл .env или он отсутствует');
		}

		this.logger.log('Конфигурация .env загружена');
		this.config = result.parsed as DotenvParseOutput;
	}

	public get<T extends number | string>(key: string): T {
		const myConfig: { [index: string]: any } = config;
		return myConfig[key] as T;
	}
}
