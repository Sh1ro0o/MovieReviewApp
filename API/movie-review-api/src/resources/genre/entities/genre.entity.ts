import { Movie } from 'src/resources/movie/entities/movie.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { unique: true, length: 50 })
  name: string;

  @Column('text', { nullable: true })
  description?: string;

  @ManyToMany(() => Movie, movie => movie.genres)
  movies?: Movie[];
}
