# nestjs-study

Start, Nest.js

## NESTJS

- it is running on express
- based on TypeScript 100% ( 왜 NestTS가 아니란 말이란 말이지. )
- 견고하고 친화적이다. NodeJS의 프리함을 잡아줌. Rule + Structure like django, spring..
- Express와 Fastify, 두 개의 프레임워크에서 돌아감. switch가 가능하다. 따라서 Express의 req, res 객체를 많이 사용하지 않는 것이 좋음

## Set up

- @nestjs/cli

```bash
$ npm i -g @nestjs/cli  // First thing to do
```

<br>

- spec파일은 테스트파일. 지우고 나중에 생성

<br>

- app.controllers와 app.services를 지우고 나만의 서비스와 컨트롤러를 만들어보자.

```bash
$ npm generate controller
? What name would you like to use for the controller? movies
// Controller('movies'), MoviesController
```

<br>
```bash
$ nest generate service
? What name would you like to use for the service? movies
```

<br>

## Tips

- 명령어

```bash
$ nest  // 명령어 확인
$ nest new  // generate new project
$ nest generate  // we can make All of NestJS thing by command line
```

```bash
ctrl을 누른채 모듈위에 마우스를 대면 모듈 위치로 이동.
```

<br>

- npm run

```bash
  "scripts": {
    "prebuild": "rimraf dist",
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  },
```

<br>

## Structure

| Module                | 설명                                                                        |
| --------------------- | --------------------------------------------------------------------------- |
| src/main.ts           | start everything, create `1` Module which is `AppModule`                    |
| src/app.module.ts     | has `Appmodule`. it is `ROOT` Modeule. connected `controllers`, `provider`  |
| src/app.controller.ts | `controllers` take URL, execute fucntion. like Express Router (middleware). |
| src/app.service.ts    | `providers`                                                                 |

<br>

We can Only have 2, AppController, AppService <br>
`$ nest generate module` <br>
what name ... ? movies <br>

> CREATE src/movies/movies.module.ts (83 bytes) <br>
> UPDATE src/app.module.ts (349 bytes) <br>
> App.module에 controller와 provider는 AppController, AppService만. <br>
> 다른 controller, provider는 모듈로 만들어 App에서 import

<br>

## Architecture

#### Why NestJS seperate Controller / Service?

- `controller` : Only Get URL, Return Function
- `service` : make Function(Business Logic)
- controller에 실행 로직을 작성할 수도 있다. 하지만 굳이 Service와 분리.
- Service에 비즈니스 로직을 작성한다.

<br>

## Concepts & Feature

### Decorator @

- 클래스에 함수의 기능을 추가할 수 있다.
- Takes URL and Mapping Function. We don't need to set up Router
- app.controllers.ts의 @Get 데코레이터는 express의 get 라우터 같은 역할을 한다. <br>
  @Get('/hello') <br>
  sayHello(): string { <br>
  return 'Hello Hi Everyone'; <br>
  } // @데코레이터는 꾸며주는 함수(여기서sayhello)와 붙어있어야함. <br>

- @Dec('sth') sth: type <br>
  : `IF YOU WANT SOMETHING YOU MUST ASK FOR THEM`

```bash
@get('/:id') {
  getItem(id: string) {
    return `return ${id} Item`;  ---> ( X )
  }
}

@get('/:id') {
  getItem(@Param('id') id: string) {
    return `return ${id} Item`;  ---> ( O )
  }
}
```

<br>

### DTO

- Data Transfer Object
- 코드를 간결하고 유효성을 검사해준다.
- 여기서는 Update에서 키를 검증하기 위해 사용함. create, update의 args인 movieData, updateData의 타입을 만들어주기 위해서
- DTO를 만든 것만으로 유효성이 검사되는 것은 아니다. `파이프`를 만들어주어야 한다. 미들웨어 같은거임
- `$ class-validator`, $ `class-transformer` 이용

```bash
// app.module.ts
app.useGlobalPipes(new ValidationPipe());

// create-movie.dto.ts
@IsString, @IsNumber

// 거의 모든 유효성을 검사할 수 있다.
@IsOptioanl @Length(10,20) @Contains('hello') @Min(10) @FQDN @IsEmail...
```

<br>

### PartialType

- $ npm i @nestjs/types <br>
  : 타입을 변환시키고 사용할 수 있게 하는 패키지

```bash
class puppy extends PartialType(Dog) { ... }
```

<br>

### Dependency Injection

- 타입에 Import하는 것 만으로도 클래스를 임포트 한 것 같은효과
- Testing Server와 앱 서버는 Seperated
- Test환경(spec.ts)과 App환경(main.ts)를 동일하게 설정해주어야 한다.
  <br><br>

### TESTING In Nest

1. "test": "jest"
2. "test:watch": "jest --watch" <br>
   : jest는 javascript 쉽게 테스팅하는 npm 패키지 <br>
   `spec.ts` 파일을 찾아 테스팅
3. "test:cov": "jest --coverage" <br>
   : 전체의 몇% 파일까지 테스팅 했는지 알려줌

4. "test:debug": "node --inspect-brk -r tsconfig-paths/register -r <br>ts-node/register node_modules/.bin/jest --runInBand"
5. "test:e2e": "jest --config ./test/jest-e2e.json" <br>
   <br>

#### 1) Unit Test : 모든 function을 따로 테스트, 서비스에서 분리된 function test

- spec.ts 파일
- beforeEach() : 각 유닛 테스트 실행 전에 실행
- beforeAll() : e2e에서 앱을 만들 때 하나의 테스트 어플리케이션을 생성할 때.
- afterAll() : 테스트 후, 예) DB CLEAN

<br>

#### 2) End-to-End(e2e) Test: 모든 시스템 테스팅

- test/ 폴더
- 특정 페이지가 나와야 하는경우, 사용자 스토리, 사용자 관점
- 사용자가 취할만한 액션을 모두 테스팅
- 한가지 이상의 유닛이 필요할 경우
- supertest ribrary

<br>
<br>

---

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
