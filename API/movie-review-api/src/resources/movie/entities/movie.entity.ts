import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
    id: number;
  
    @Column('varchar', { length: 100 })
    title: string;
  
    @Column('text', { nullable: true })
    description?: string;

    @Column('int', {nullable: true})
    releaseYear?: number;
}
