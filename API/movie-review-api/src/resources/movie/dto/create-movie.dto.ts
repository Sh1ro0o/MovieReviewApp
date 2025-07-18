import { IsArray, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateMovieDto {
  @IsString()
  @MaxLength(50)
  title: string;

  @IsOptional()
  @IsNumber()
  releaseYear?: number;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  director?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  genreIds: number[];
}
