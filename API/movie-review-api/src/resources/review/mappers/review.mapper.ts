import { UpdateReviewDto } from "../dto/update-review.dto";
import { Review } from "../entities/review.entity";

export function updateReviewDtoToReview (updateReviewDto: UpdateReviewDto, review: Review): Review {
  if(updateReviewDto.username) review.username = updateReviewDto.username;
  if(updateReviewDto.review) review.review = updateReviewDto.review;
  if(updateReviewDto.movieId) review.movieId = updateReviewDto.movieId;

  return review;
}