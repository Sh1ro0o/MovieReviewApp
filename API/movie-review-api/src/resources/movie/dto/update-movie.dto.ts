import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { IsNumber } from 'class-validator';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @IsNumber()
  id: number;
}
