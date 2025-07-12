import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { Movie } from '../movie/entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewFilter } from './filters/review.filter';
import { updateReviewDtoToReview } from './mappers/review.mapper';

@Injectable()
export class ReviewService {

  constructor(
    @InjectRepository(Review)
    private readonly repositoryReview: Repository<Review>,

    @InjectRepository(Movie)
    private readonly repositoryMovie: Repository<Movie>
  ) { }

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const newReview = {
      ...createReviewDto,
      createdDate: new Date()
    }

    const existingMovie = await this.repositoryMovie.findOneBy({ id: createReviewDto.movieId });
    if (!existingMovie) {
      throw new BadRequestException(`Movie with id: ${createReviewDto.movieId} not found!`); 
    }

    const review = this.repositoryReview.create(newReview);
    return this.repositoryReview.save(review);
  }

  async findAll(filter: ReviewFilter): Promise<Review[]> {
    const reviewFilter: Partial<ReviewFilter> = {}

    if (filter.username !== undefined) reviewFilter.username = filter.username;
    if (filter.review !== undefined) reviewFilter.review = filter.review;
    if (filter.createdDate !== undefined) reviewFilter.createdDate = filter.createdDate;
    if (filter.movieId !== undefined) reviewFilter.movieId = filter.movieId;

    return this.repositoryReview.findBy(reviewFilter);
  }

  async findOne(id: number): Promise<Review | null> {
    return this.repositoryReview.findOneBy({id});
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    let existingReview = await this.repositoryReview.findOneBy({id});
    if (!existingReview) {
      throw new NotFoundException(`Review with id: ${id} not found!`); 
    }

    if (updateReviewDto.movieId) {
      const existingMovie = await this.repositoryMovie.findOneBy({ id: updateReviewDto.movieId });
      if (!existingMovie) {
        throw new NotFoundException(`Movie with id: ${updateReviewDto.movieId} not found!`);
      }

      existingReview.movie = existingMovie;
    }

    existingReview = updateReviewDtoToReview(updateReviewDto, existingReview)
    return this.repositoryReview.save(existingReview);
  }

  async remove(id: number): Promise<void> {
    const existingReview = await this.repositoryReview.findOneBy({id});
    if (!existingReview) {
      throw new NotFoundException(`Review with id: ${id} not found!`); 
    }

    await this.repositoryReview.remove(existingReview);
  }
}
