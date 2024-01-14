import { IUserService } from './user.service.interface';
import { UserRegisterDto } from '../dto/user-register.dto';
import { UserEntity } from '../user.entity';
import { UserLoginDto } from '../dto/user-login.dto';
import { injectable } from 'inversify';

@injectable()
export class UserService implements IUserService {
	public async createUser({ email, name, password }: UserRegisterDto): Promise<UserEntity | null> {
		const newUser = new UserEntity(email, name);
		await newUser.setPassword(password);
		return newUser;
	}

	public async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		return false;
	}
}
