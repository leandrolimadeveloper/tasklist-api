import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetUserProfileUseCase } from './GetUserProfileUseCase';

class GetUserProfileController {
    async handle(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;

        const getUserProfileUseCase = container.resolve(GetUserProfileUseCase);

        const user = await getUserProfileUseCase.execute(user_id);

        return response.json(user);
    }
}

export { GetUserProfileController };
