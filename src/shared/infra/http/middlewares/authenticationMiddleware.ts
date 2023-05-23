import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '@modules/account/infra/typeorm/repositories/UsersRepository';

import { AppError } from '../errors/AppError';

interface IPayload {
    sub: string;
}

export async function authenticationMiddleware(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('Token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const { sub: user_id } = verify(token, process.env.JWT_SECRET) as IPayload;

        const usersRepository = new UsersRepository();

        const user = await usersRepository.findById(user_id);

        if (!user) {
            // eslint-disable-next-line quotes
            throw new AppError("User doesn't exists", 401);
        }

        request.user = {
            id: user_id,
        };

        next();
    } catch {
        throw new AppError('Invalid token', 401);
    }
}
