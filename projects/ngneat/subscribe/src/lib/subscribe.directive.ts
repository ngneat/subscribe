import {
  ChangeDetectorRef,
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
  NgModule,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
interface SubscribeContext<T> {
  $implicit: T;
  subscribe: T;
  error: any;
  completed: boolean;
}

type IfAny<T, Y, N> = 0 extends (1 & T) ? Y : N;

@Directive({
  selector: '[subscribe]',
})
export class SubscribeDirective<T, InitialSyncValue extends boolean = true> implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;

  private context: SubscribeContext<any> = {
    $implicit: undefined,
    subscribe: undefined,
    error: undefined,
    completed: false
  };

  @Input() initialSyncValue!: InitialSyncValue;
  @Input() strategy: 'markForCheck' | 'detectChanges' = 'markForCheck';

  @Input() set subscribe(source: Observable<T>) {
    this.subscription?.unsubscribe();

    if (!source) {
      return;
    }

    this.subscription = source.subscribe({
      next: (value) => {
        this.context.$implicit = value;
        this.context.subscribe = value;

        this.cdr[this.strategy]();
      },
      error: (err) => {
        this.context.error = err;
        this.cdr[this.strategy]();
      },
      complete: () => {
        this.context.completed = true;
        this.cdr[this.strategy]();
      },
    });
  }

  static ngTemplateContextGuard<T, InitialSyncValue extends boolean = true>(
    directive: SubscribeDirective<T, InitialSyncValue>,
    context: unknown
  ): context is SubscribeContext<IfAny<InitialSyncValue, T, T | undefined>>{
    return true;
  }

  constructor(
    private tpl: TemplateRef<any>,
    private cdr: ChangeDetectorRef,
    private vcr: ViewContainerRef
  ) {}

  ngOnInit() {
    this.vcr.createEmbeddedView(this.tpl, this.context);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}

@NgModule({
  declarations: [SubscribeDirective],
  exports: [SubscribeDirective],
})
export class SubscribeModule {}
