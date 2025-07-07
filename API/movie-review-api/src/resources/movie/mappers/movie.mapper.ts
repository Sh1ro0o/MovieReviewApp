import { UpdateMovieDto } from "../dto/update-movie.dto";
import { Movie } from "../entities/movie.entity";

export function updateMovieDtoToMovie (updateMovieDto: UpdateMovieDto, movie: Movie): Movie {
  if (updateMovieDto.title) movie.title = updateMovieDto.title;
  if (updateMovieDto.releaseYear) movie.releaseYear = updateMovieDto.releaseYear;
  if (updateMovieDto.director) movie.director = updateMovieDto.director;
  if (updateMovieDto.description) movie.description = updateMovieDto.description;

  return movie;
}