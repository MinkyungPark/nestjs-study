# nestjs-study
Start, Nest.js


## NESTJS
- it is running on express
- based on TypeScript 100% ( 왜 NestTS가 아니란 말이란 말이지. )
- 견고하고 친화적이다. NodeJS의 프리함을 잡아줌. Rule + Structure like django, spring..

### Set up
- @nestjs/cli
```bash
$ npm i -g @nestjs/cli  // First thing to do
```
<br>

- spec파일은 테스트파일. 지우고 나중에 생성

<br>

- app.controllers와  app.services를 지우고 나만의 서비스와 컨트롤러를 만들어보자.
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

### Tips
- 명령어
```bash
$ nest  // 명령어 확인
$ nest new  // generate new project
$ nest generate  // we can make All of NestJS thing by command line
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

- TIPS
```bash
ctrl을 누른채 모듈위에 마우스를 대면 모듈 위치로 이동.
```
<br>

### Structure

|Module|설명|
|------|---|
|src/main.ts|start everything, create `1` Module which is `AppModule`|
|src/app.module.ts|has `Appmodule`. it is `ROOT` Modeule. connected `controllers`, `provider`|
|src/app.controller.ts|`controllers` take URL, execute fucntion. like Express Router (middleware).|
|src/app.service.ts|`providers`|

### Architecture
#### Why NestJS seperate Controller / Service?
- `controller` : Only Get URL, Return Function
- `service` : make Function(Business Logic)
- controller에 실행 로직을 작성할 수도 있다. 하지만 굳이 Service와 분리.
- Service에 비즈니스 로직을 작성한다.


### Concepts
#### Decorator @
- 클래스에 함수의 기능을 추가할 수 있다.
- Takes URL and Mapping Function. We don't nedd to set up Router
- app.controllers.ts의 @Get 데코레이터는 express의 get 라우터 같은 역할을 한다. <br>
@Get('/hello') <br>
sayHello(): string { <br>
  return 'Hello Hi Everyone'; <br>
} // @데코레이터는 꾸며주는 함수(여기서sayhello)와 붙어있어야함.  <br>

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
