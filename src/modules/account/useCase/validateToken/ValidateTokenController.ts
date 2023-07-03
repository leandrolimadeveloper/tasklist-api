import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ValidateTokenUseCase } from './ValidateTokenUseCase';

class ValidateTokenController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { token } = request.body;

        const validateTokenUseCase = container.resolve(ValidateTokenUseCase);

        const userInfo = await validateTokenUseCase.execute(token);

        return response.json({
            user: {
                id: userInfo.user.id,
                name: userInfo.user.name,
                email: userInfo.user.email,
            },
            token: userInfo.token,
        });
    }
}

export { ValidateTokenController };
