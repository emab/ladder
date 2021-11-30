import { ajax as Ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs';

// a proxy for the default ajax function
// it adds a token to the header, provided through an epic
// adapted from https://stackoverflow.com/questions/45778994/rxjs-how-to-set-default-request-headers

export type AuthenticatedRequest<ResponseType> = (
  ajax: typeof Ajax
) => Observable<ResponseType>;

const createAuthorizationHeader = (token: string) => ({
  Authorization: `Bearer ${token}`,
});

// the function names we will proxy
const getHeadersPos = (ajaxMethod: string): number => {
  switch (ajaxMethod) {
    case 'get':
    case 'getJSON':
    case 'delete':
      return 1;
    case 'patch':
    case 'post':
    case 'put':
      return 2;
    default:
      return -1;
  }
};

const ajaxProxy =
  (token: string) =>
  (obj: typeof Ajax): typeof Ajax => {
    return new Proxy(obj, {
      get(target: typeof Ajax, propKey: PropertyKey) {
        // @ts-ignore
        const origProp = target[propKey];
        const headersPos = getHeadersPos(propKey as string);

        if (headersPos === -1 || typeof origProp !== 'function') {
          return origProp;
        }

        return function (...args: object[]) {
          args[headersPos] = {
            ...args[headersPos],
            ...createAuthorizationHeader(token),
          };
          // @ts-ignore
          return origProp.apply(this, args);
        };
      },
    });
  };

export const ajax = (token: string) => ajaxProxy(token)(Ajax);
