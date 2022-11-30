import { ChangeDetectorRef, Directive, EmbeddedViewRef, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef, } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

interface SubscribeContext<T> {
  $implicit: T;
  subscribe: T;
  error: any;
  completed: boolean;
}

@Directive({
  selector: '[subscribe]',
  standalone: true
})
export class SubscribeDirective<T> implements OnInit, OnDestroy {
  private subscription: Subscription | null = null;
  private viewRef: EmbeddedViewRef<any> | null = null;

  private context: SubscribeContext<T> = {
    $implicit: undefined as T,
    subscribe: undefined as T,
    error: undefined,
    completed: false,
  };

  @Input() strategy: 'markForCheck' | 'detectChanges' = 'markForCheck';

  @Input() set subscribe(source: Observable<T>) {
    this.subscription?.unsubscribe();

    if(!source) {
      return;
    }

    this.subscription = source.subscribe({
      next: (value) => {
        this.context.$implicit = value;
        this.context.subscribe = value;
        this.onChange();
      },
      error: (err) => {
        console.error(err);
        this.context.error = err;
        this.onChange();
      },
      complete: () => {
        this.context.completed = true;
        this.onChange();
      },
    });
  }

  static ngTemplateContextGuard<T>(
    directive: SubscribeDirective<T>,
    context: unknown
  ): context is SubscribeContext<T> {
    return true;
  }

  constructor(private tpl: TemplateRef<SubscribeContext<T>>, private cdr: ChangeDetectorRef, private vcr: ViewContainerRef) {
  }

  ngOnInit() {
    this.viewRef = this.vcr.createEmbeddedView(this.tpl, this.context);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscription = null;
    this.viewRef = null;
  }

  private onChange() {
    if(this.strategy === 'markForCheck') {
      this.cdr.markForCheck();
    } else {
      this.viewRef?.detectChanges();
    }
  }
}
