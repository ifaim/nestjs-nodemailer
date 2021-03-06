<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Nodemailer utilities module for [Nest](https://github.com/nestjs/nest) based on the [nodemailer](https://github.com/nodemailer/nodemailer) package.

## Installation

```bash
$ npm i --save @iaminfinity/nodemailer
```
## Usage

Import `NodemailerModule`:

```typescript
@Module({
  imports: [
    NodemailerModule.register({
      host: 'smtp.example.com',
      port: 587,
      secure: false,
      auth: {
          user: 'username',
          pass: 'password'
      }
    })
  ],
  providers: [...]
})
export class AppModule {}
```

Inject `NodemailerService`:

```typescript
@Injectable()
export class AppService {
  constructor(private readonly nodemailerService: NodemailerService) {}
}
```

## Async options

Quite often you might want to asynchronously pass your module options instead of passing them beforehand. In such case, use registerAsync() method, that provides a couple of various ways to deal with async data.

**1. Use factory**

```typescript
NodemailerModule.registerAsync({
  useFactory: () => ({
    host: 'smtp.example.com',
    port: 587,
    secure: false,
    auth: {
        user: 'username',
        pass: 'password'
    }
  })
})
```

Obviously, our factory behaves like every other one (might be `async` and is able to inject dependencies through `inject`).

```typescript
NodemailerModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => configService.getMailConfig(),
  inject: [ConfigService],
})
```

**2. Use class**

```typescript
NodemailerModule.registerAsync({
  useClass: NodemailerConfigService
})
```

Above construction will instantiate `JwtConfigService` inside `JwtModule` and will leverage it to create options objec

```typescript
class NodemailerConfigService implements NodemailerOptionsFactory {
  createNodemailerOptions(): NodemailerModuleOptions {
    return {
      host: 'smtp.example.com',
      port: 587,
      secure: false,
      auth: {
        user: 'username',
        pass: 'password'
      }
    };
  }
}
```

**3. Use existing**

```typescript
NodemailerModule.registerAsync({
  imports: [ConfigModule],
  useExisting: ConfigService
})
```

It works the same as `useClass` with one critical difference - `NodemailerModule` will lookup imported modules to reuse already created ConfigService, instead of instantiating it on its own.

## Stay in touch

- Author - [Fahim Rahman](https://github.com/ifaim)
