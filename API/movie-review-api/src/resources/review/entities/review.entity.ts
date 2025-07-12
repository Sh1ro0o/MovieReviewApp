import { Movie } from "src/resources/movie/entities/movie.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  username: string;

  @Column('varchar', { length: 1000 })
  review: string;

  @Column('timestamptz')
  createdDate: Date;

  @Column()
  movieId: number;

  @ManyToOne(() => Movie, movie => movie.reviews, { onDelete: 'CASCADE' })
  movie?: Movie;
}
