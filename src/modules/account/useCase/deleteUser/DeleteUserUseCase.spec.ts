import { UsersRepositoryInMemory } from '@modules/account/repositories/in-memory/UsersRepositoryInMemory';
import { DeleteUserUseCase } from './DeleteUserUseCase';

import { AppError } from '@shared/infra/http/errors/AppError';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let deleteUserUseCase: DeleteUserUseCase;

describe('Delete a user', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        deleteUserUseCase = new DeleteUserUseCase(usersRepositoryInMemory);
    });

    it('should be able to delete a user', async () => {
        const user = {
            id: '123',
            name: 'User name',
            email: 'email@email.com',
            password: 'pass',
        };

        const userCreated = await usersRepositoryInMemory.create(user);

        await deleteUserUseCase.execute(userCreated.id);

        const userFound = await usersRepositoryInMemory.findById(userCreated.id);

        expect(userFound).toBeUndefined();
    });

    it('should not be able to delete a user if does not exist', async () => {
        await expect(deleteUserUseCase.execute('id-that-not-exists-123')).rejects.toBeInstanceOf(AppError);
    });
});
