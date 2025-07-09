import { IsString, MaxLength, IsNumber } from "class-validator";

export class CreateReviewDto {
  @IsString()
  @MaxLength(50)
  username: string;

  @IsString()
  @MaxLength(1000)
  review: string;

  @IsNumber()
  movieId: number;
}
