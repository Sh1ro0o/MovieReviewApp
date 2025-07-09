import { Genre } from "src/resources/genre/entities/genre.entity";
import { Review } from "src/resources/review/entities/review.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => Review, review => review.movie)
    reviews: Review[];
}
