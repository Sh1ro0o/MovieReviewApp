import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { Movie } from '../movie/entities/movie.entity';
import { InjectRepository } from '@nestjs/typeorm';

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

  findAll() {
    return `This action returns all review`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
