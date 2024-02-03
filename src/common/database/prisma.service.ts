import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { ILogger } from '../../logger/logger.interface';
import { PrismaClient } from '@prisma/client';

@injectable()
export class PrismaService {
	prismaClient: PrismaClient;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this.prismaClient = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.prismaClient.$connect();
			this.logger.log('PrismaService: Успешно подключено');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error('PrismaService: Ошибка подключения ' + e.message);
			}
		}
	}

	async disconnect(): Promise<void> {
		this.prismaClient.user.create;
		await this.prismaClient.$connect();
	}
}
