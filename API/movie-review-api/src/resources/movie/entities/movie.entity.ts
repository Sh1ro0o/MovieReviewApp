import { Genre } from "src/resources/genre/entities/genre.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
    id: number;
  
    @Column('varchar', { length: 100 })
    title: string;
  
    @Column('int', { nullable: true })
    releaseYear?: number;

    @Column('varchar', { nullable: true, length: 100 })
    director?: string;

    @Column('text', { nullable: true })
    description?: string;

    @ManyToMany(() => Genre, genre => genre.movies, { cascade: true })
    @JoinTable()
    genres: Genre[];
}
