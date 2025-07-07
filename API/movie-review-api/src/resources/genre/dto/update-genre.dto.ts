import { PartialType } from '@nestjs/mapped-types';
import { CreateGenreDto } from './create-genre.dto';
import { IsNumber } from 'class-validator';

export class UpdateGenreDto extends PartialType(CreateGenreDto) {
  @IsNumber()
  id: number;
}
