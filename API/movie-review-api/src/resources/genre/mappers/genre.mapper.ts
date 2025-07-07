import { UpdateGenreDto } from "../dto/update-genre.dto";
import { Genre } from "../entities/genre.entity";

export function updateGenreDtoToGenre (updateGenreDto: UpdateGenreDto, genre: Genre): Genre {
  if (updateGenreDto.name) genre.name = updateGenreDto.name;
  if (updateGenreDto.description) genre.description = updateGenreDto.description;

  return genre;
}