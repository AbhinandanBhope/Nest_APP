import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn ,} from 'typeorm';

@Entity(
    { database: "user" }
)
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({unique:true})
    email: string;

    @Column()
    password: string;

    @Column({default:"User"})
    role: string;
 

    @Column({ nullable: true})
    isDeleted:Date
    


}