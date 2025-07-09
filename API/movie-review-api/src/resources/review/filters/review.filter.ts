import { IsDateString, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class ReviewFilter {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  username?: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  review?: string;

  @IsOptional()
  @IsDateString()
  createdDate?: Date;

  @IsOptional()
  @IsNumber()
  movieId?: number;
}