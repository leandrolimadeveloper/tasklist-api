/* eslint-disable indent */
import { v4 as uuidV4 } from 'uuid';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { User } from '@modules/account/infra/typeorm/entities/User';

@Entity('tasks')
class Task {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    done: boolean;

    @Column()
    my_day: boolean;

    @ManyToOne(() => User, (user) => user.tasks)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    user_id: string;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Task };
