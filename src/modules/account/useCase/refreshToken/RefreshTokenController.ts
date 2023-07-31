import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { RefreshTokenUseCase } from './RefreshTokenUseCase';

class RefreshTokenController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { refreshToken } = request.body || request.headers['x-access-token'] || request.query;

            const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

            const refreshTokenResponse = await refreshTokenUseCase.execute(refreshToken);

            return response.json(refreshTokenResponse);
        } catch (err) {
            return response.status(500).json({ error: 'JsonWebTokenError: invalid signature' });
        }
    }
}

export { RefreshTokenController };
