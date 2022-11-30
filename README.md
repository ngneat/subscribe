[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)]()
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-1)
[![ngneat](https://img.shields.io/badge/@-ngneat-383636?style=flat-square&labelColor=8f68d4)](https://github.com/ngneat/)
[![spectator](https://img.shields.io/badge/tested%20with-spectator-2196F3.svg?style=flat-square)]()


>  Subscription Handling Directive

## Installation

`npm install @ngneat/subscribe`

## Usage
Now we can import the `SubscribeDirective` and use the `subscribe` directive in our template:

```ts
import { SubscribeDirective } from '@ngneat/subscribe';

@Component({
  imports: [SubscribeDirective],
  template: `
    <ng-container *subscribe="users$ as users; let error=error">
      {{ users | json }}
      {{ error }}
    </ng-container>
  `
})
class MyComponent {
  users$ = inject(UserService).getUsers();
}
```
