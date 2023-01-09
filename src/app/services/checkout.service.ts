import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Purchase} from "../common/purchase";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {PaymentInfo} from "../common/payment-info";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl = environment.backendUrl + '/checkout/purchase';
  private paymentIntentUrl = environment.backendUrl + '/checkout/payment-intent';

  constructor(private httpClient: HttpClient) {
  }

  createPaymentIntent(paymentInfo: PaymentInfo): Observable<any> {
    return this.httpClient.post<PaymentInfo>(this.paymentIntentUrl, paymentInfo);
  }

  placeOrder(purchase: Purchase): Observable<any> {

    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);
  }

}
