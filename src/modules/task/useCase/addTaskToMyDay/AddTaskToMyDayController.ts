import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { AddTaskToMyDayUseCase } from './AddTaskToMyDayUseCase';

class AddTaskToMyDayController {
    async handle(request: Request, response: Response) {
        const { id } = request.params;

        const addTaskToMyDayUseCase = container.resolve(AddTaskToMyDayUseCase);

        await addTaskToMyDayUseCase.execute({
            taskId: id,
        });

        return response.status(200).send();
    }
}

export { AddTaskToMyDayController };
