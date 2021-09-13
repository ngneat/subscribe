import { Component } from '@angular/core';
import { of } from 'rxjs';

interface Foo {
  bar?: {
    label?: string
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  source$ = of<Foo>({ bar: { label: ''}})

  v: undefined | { f: string }
}
