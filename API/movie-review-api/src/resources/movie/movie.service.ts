import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { In, Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Genre } from '../genre/entities/genre.entity';
import { MovieFilter } from './filters/movie.filter';
import { updateMovieDtoToMovie } from './mappers/movie.mapper';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,

    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>
  ) { }

  async create(createMovieDto: CreateMovieDto) : Promise<Movie> {
    const genres = await this.genreRepository.findBy({
      id : In(createMovieDto.genreIds)
    });

    if (genres.length < 1) {
      throw new BadRequestException('At least one genre must be specified');
    }
    
    const movie = this.movieRepository.create({
      title: createMovieDto.title,
      releaseYear: createMovieDto.releaseYear,
      director: createMovieDto.director,
      description: createMovieDto.description,
      genres,
    });

    return this.movieRepository.save(movie);
  }

  async findAll(filter: MovieFilter): Promise<Movie[]> {
    const query = this.movieRepository.createQueryBuilder('movie');
    query.innerJoinAndSelect('movie.genres', 'genre') //includes genres

    if (filter.title) {
      query.andWhere('LOWER(movie.title) LIKE LOWER(:title)', { title: `%${filter.title}%` });
    }
    if (filter.releaseYear) {
      query.andWhere('movie.releaseYear = :releaseYear', { releaseYear: filter.releaseYear });
    }
    if (filter.director) {
      query.andWhere('LOWER(movie.director) LIKE LOWER(:director)', { director: `%${filter.director}%` });
    }
    if (filter.description) {
      query.andWhere('LOWER(movie.description) LIKE LOWER(:description)', { description: `%${filter.description}%` });
    }
    if (filter.genres && filter.genres?.length > 0) {
      query.andWhere('genre.id IN (:...genreIds)', { genreIds: filter.genres })
    }
  
    return await query.getMany();
  }

  async findOne(id: number): Promise<Movie | null> {
    return this.movieRepository.findOne({
        where: { id },
        relations: ['genres'] //includes genres
      });
  }

  async update(updateMovieDto: UpdateMovieDto): Promise<Movie> {
    let existingMovie = await this.movieRepository.findOneBy({ id: updateMovieDto.id });
    if (!existingMovie) {
      throw new NotFoundException(`Movie with id: ${updateMovieDto.id} not found!`); 
    }

    if (updateMovieDto.genreIds) {
       const genres = await this.genreRepository.findBy({
        id: In(updateMovieDto.genreIds)
       });

       if (genres.length !== updateMovieDto.genreIds.length) {
        throw new BadRequestException(`Some of the provided genres don't exist`);
       }

       existingMovie.genres = genres;
    }

    existingMovie = updateMovieDtoToMovie(updateMovieDto, existingMovie);
    return this.movieRepository.save(existingMovie);
  }

  async remove(id: number): Promise<boolean> {
    const existingMovie = await this.movieRepository.findOneBy({ id });
    if (!existingMovie) {
      throw new NotFoundException(`Movie with id: ${id} not found!`); 
    }

    const result = await this.movieRepository.delete({ id });
    return (result?.affected ?? 0) > 0;
  }
}
