import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ValidationPipe } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  /* beforeEach(async () => { // 매 테스트마다 어플리케이션 생성
  이 경우 생성해 놓은 Movie 객체가 테스트마다(it) 생성 
  */
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    /* --> '/movies/:id'에서 typeof id는 string, because doesn't have any pipe
    main.ts의 환경과 똑같이 설정을 해주어야 한다.
    */
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome this is HOME');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()) // from supertest ribrary
        .get('/movies')
        .expect(200)
        .expect([]);
    });

    it('POST', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2020,
          genres: ['Test'],
        })
        .expect(201);
    });

    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'Test',
          year: 2020,
          genres: ['Test'],
          other: 'thing',
        })
        .expect(400); // forbidNonWhitelisted: true
    });

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/999').expect(404);
    });
    it('PATCH', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'Updated Test' })
        .expect(200);
    });
    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
  });
});
