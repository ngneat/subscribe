
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { of, throwError } from 'rxjs';
import { SubscribeDirective } from './subscribe.directive';

describe('SubscribeDirective', () => {
  let host: SpectatorHost<SubscribeDirective<any, any>>;

  const createHost = createHostFactory(SubscribeDirective);

  it('should do nothing if no source ', () => {
    host = createHost(`<div *subscribe="source; let result">{{ result }}</div>`, {
      hostProps: {
        source: null
      }
    });

    expect(host.query('div')).toHaveText('');
  });


  it('should subscribe ', () => {
    host = createHost(`<div *subscribe="source; let result">{{ result }}</div>`, {
      hostProps: {
        source: of(1)
      }
    });

    expect(host.query('div')).toHaveText('1');
  });


  it('should show error ', () => {
    host = createHost(`<div *subscribe="source; let error=error">{{ error }}</div>`, {
      hostProps: {
        source: throwError('error')
      }
    });

    expect(host.query('div')).toHaveText('error');
  });
});