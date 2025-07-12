import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, HttpCode } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieFilter } from './filters/movie.filter';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get('all')
  findAll(@Query() filter: MovieFilter) {
    return this.movieService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.findOne(id);
  }

  @Patch()
  update(@Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(updateMovieDto);
  }

  @Delete(':id')
  @HttpCode(204) // Sets status code to 204 No Content
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.movieService.remove(id);
  }
}
