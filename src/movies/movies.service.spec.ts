import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => { // Execute before test
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => { // Indevidual Test(it)
    expect(service).toBeDefined();
  });

  /* Start Movie Service Test */
  describe("getAll", () => {
    it("should return an array include movie llist", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("getOne", () => {
    it("sholud return a movie", () => {
      service.create({ // create Movie Instance before Test
        title: "Test Movie",
        genres: ["Test"],
        year: 2020
      });      
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it("should throw 4040 error", () => {
      try{
        service.getOne(999);
      } catch(e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie id  999 is not found.`)
      }
    });

  });

});
