import { UsersRepositoryInMemory } from '@modules/account/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { GetUserProfileUseCase } from './GetUserProfileUseCase';
import { AppError } from '@shared/infra/http/errors/AppError';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let getUserProfileUseCase: GetUserProfileUseCase;

describe('Get a user profile', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        getUserProfileUseCase = new GetUserProfileUseCase(usersRepositoryInMemory);
    });

    it('should be able to get a user profile', async () => {
        const user = {
            id: '123',
            name: 'User name',
            email: 'email@email.com',
            password: 'pass',
        };

        await createUserUseCase.execute(user);

        const createdUser = await usersRepositoryInMemory.findByEmail(user.email);

        const obtainedUser = await getUserProfileUseCase.execute(createdUser.id);

        expect(obtainedUser).toBeDefined();
        expect(createdUser.id).toEqual(obtainedUser.id);
        expect(obtainedUser).not.toHaveProperty('password');
    });

    it('should not be able to get a user profile if it does not exist', async () => {
        await expect(getUserProfileUseCase.execute('id-that-not-exists')).rejects.toBeInstanceOf(AppError);
    });
});
