import {Inject, Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {OKTA_AUTH} from "@okta/okta-angular";
import {OktaAuth} from "@okta/okta-auth-js";
import {from, lastValueFrom, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(@Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(req, next));
  }

  private async handleAccess(req: HttpRequest<any>, next: HttpHandler) {

    // Only add an access token for secured endpoints
    const securedEndpoints = ['http://129.159.46.95:8080/api/orders'];

    if (securedEndpoints.some(url => req.urlWithParams.includes(url))) {

      // get access token
      const accessToken = this.oktaAuth.getAccessToken();

      // clone the request and add new header with access token
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken,
        }
      });
    }

    return await lastValueFrom(next.handle(req));
  }
}
