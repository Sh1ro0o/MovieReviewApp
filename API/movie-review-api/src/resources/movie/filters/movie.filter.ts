import { IsOptional, IsString, MaxLength, IsNumber, IsArray } from "class-validator";

export class MovieFilter {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  title?: string;

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

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  genreIds?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  reviewIds?: number[];
}