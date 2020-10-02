import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('role')
export class Role {
    @PrimaryGeneratedColumn({
        name: 'id',
        type: 'int'
    })
}