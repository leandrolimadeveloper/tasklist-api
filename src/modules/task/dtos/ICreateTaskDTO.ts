interface ICreateTaskDTO {
    id?: string;
    name: string;
    description: string;
    done?: boolean;
    my_day?: boolean;
    user_id: string;
}

export { ICreateTaskDTO };
