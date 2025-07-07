import { IsOptional, IsString, MaxLength } from "class-validator";

export class GenreFilter {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}