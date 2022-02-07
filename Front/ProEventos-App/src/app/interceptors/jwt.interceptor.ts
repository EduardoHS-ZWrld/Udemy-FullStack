import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AccountService } from '@app/services/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private accountService: AccountService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let currentUser;
    const headersConfig = {
      'Accept': 'application/json'
    };

    if (request.headers.get('skip') == 'true') {
      return next.handle(request)
    }

    this.accountService.currentUser$.pipe(take(1)).subscribe(user => { currentUser = user; });

    headersConfig['Authorization'] = `Bearer ${currentUser.token}`

    if (currentUser) {
      request = request.clone({
        setHeaders: headersConfig
      })
    }

    return next.handle(request);
  }
}
