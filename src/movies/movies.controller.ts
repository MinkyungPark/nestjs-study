import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { Movie } from './entities/movies.entity';
import { MoviesService } from './movies.service';

@Controller('movies') //  /movies
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }

    @Get('/:id') // :id는 가장 밑에. 그냥 라우터 주소도 id로 생각해버린다.
    getOne(@Param('id') movieId: string) {
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData) {
        return this.moviesService.create(movieData);
    }

    @Delete('/:id')
    deleteOne(@Param('id') movieId: string) {
        return this.moviesService.deleteOne(movieId);
    }

    @Patch('/:id')
    update(@Param('id') movieId: string, @Body() updateData) {
        return this.moviesService.update(movieId, updateData);
    }
}
