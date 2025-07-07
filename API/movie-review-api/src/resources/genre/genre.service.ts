import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { updateGenreDtoToGenre } from './mappers/genre.mapper';
import { GenreFilter } from './filters/genre.filter';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>
  ) { }

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    const newGenre = this.genreRepository.create(createGenreDto);
    return this.genreRepository.save(newGenre);
  }

  async findAll(filter: GenreFilter): Promise<Genre[]> {
    const genreFilter: Partial<GenreFilter> = {};

    if (filter.name !== undefined) genreFilter.name = filter.name;
    if (filter.description !== undefined) genreFilter.description = filter.description;

    return this.genreRepository.findBy(genreFilter);
  }

  async findOne(id: number): Promise<Genre | null>  {
    return this.genreRepository.findOneBy({ id });
  }

  async update(id: number, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    let existingGenre = await this.genreRepository.findOneBy({ id });
    if (!existingGenre) {
      throw new NotFoundException(`Genre with id: ${id} not found!`); 
    }

    existingGenre = updateGenreDtoToGenre(updateGenreDto, existingGenre); 
    return this.genreRepository.save(existingGenre);
  }

  async remove(id: number): Promise<boolean> {
    const existingGenre = await this.genreRepository.findOneBy({ id });
    if (!existingGenre) {
      throw new NotFoundException(`Genre with id: ${id} not found!`); 
    }

    const result = await this.genreRepository.delete({ id });
    return (result?.affected ?? 0) > 0;
  }
}
