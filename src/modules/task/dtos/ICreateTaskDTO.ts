interface ICreateTaskDTO {
    id?: string;
    name: string;
    description: string;
    done?: boolean;
    user_id: string;
}

export { ICreateTaskDTO };
