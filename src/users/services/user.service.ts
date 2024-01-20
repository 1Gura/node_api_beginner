import { IUserService } from './user.service.interface';
import { UserRegisterDto } from '../dto/user-register.dto';
import { UserEntity } from '../user.entity';
import { UserLoginDto } from '../dto/user-login.dto';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../types';
import { IConfigService } from '../../config/config.service.interface';

@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.ConfigService) private configService: IConfigService) {}

	public async createUser({ email, name, password }: UserRegisterDto): Promise<UserEntity | null> {
		const newUser = new UserEntity(email, name);
		const salt = this.configService.get<number>('SALT');
		await newUser.setPassword(password, salt || 10);
		return newUser;
	}

	public async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		return false;
	}
}
