/* eslint-disable indent */
import { v4 as uuidV4 } from 'uuid';
import { Entity, Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Task } from '@modules/task/infra/typeorm/entities/Task';

@Entity('users')
class User {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Task, (task) => task.user)
    tasks: Task[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { User };
