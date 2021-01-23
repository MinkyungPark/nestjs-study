import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { NotEquals } from 'class-validator';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    // Execute before test
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    // Indevidual Test(it)
    expect(service).toBeDefined();
  });

  /* Start Movie Service Test */
  describe('create', () => {
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        genres: ['Test'],
        year: 2020,
      });
      const afterCreate = service.getAll().length;
      console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('getAll', () => {
    it('should return an array include movie llist', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('sholud return a movie', () => {
      service.create({
        // create Movie Instance before Test
        title: 'Test Movie',
        genres: ['Test'],
        year: 2020,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 4040 error', () => {
      try {
        service.getOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual(`Movie id  999 is not found.`);
      }
    });
  });

  describe('deleteOne', () => {
    it('delete a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['Test'],
        year: 2020,
      });
      const beforeDelete = service.getAll();
      service.deleteOne(1);
      const afterDelete = service.getAll();
      expect(afterDelete.length).toEqual(beforeDelete.length - 1);
    });

    it('should return a 404', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['Test'],
        year: 2020,
      });
      service.update(1, { title: 'Updated Test' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('Updated Test');
    });
  });

  it('should throw a NotFoundException', () => {
    try {
      service.update(999, {});
    } catch (e) {
      expect(e).toBeInstanceOf(NotFoundException);
    }
  });
});
