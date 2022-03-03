import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, tap, catchError } from 'rxjs';

import { OrderDetails } from '../models/Users';

import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  private url = 'http://localhost:3000/order';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) {}

  createDetails(details:OrderDetails): Observable<OrderDetails> {
    return this.http
      .post<any>(`${this.url}/createDetails`, details, this.httpOptions)
      .pipe(
      first(), 
      tap((res)=>{
        localStorage.setItem('estdCost',res.estdCost);
        localStorage.setItem('orderID',res.orderID);
        this.router.navigate(['/confirmation']);
      }),
      catchError(this.errorHandler.handleError<any>('createDetails')));
  }

  processOrder(orderId:String, email:String): Observable<any> {
    return this.http.post<any>(`${this.url}/processOrder`, [orderId, email], this.httpOptions)
    .pipe(
      first(),
      tap((obj)=>{
        this.router.navigate(['/get-order-details']);
      }),
      catchError(this.errorHandler.handleError<any>('processOrder'))
    );}

  getDetails(email:String): Observable<any> {
    return this.http
    .post<any>(`${this.url}/getDetails`,[email], this.httpOptions)
      .pipe(
        first(),
        tap((obj)=>{
          localStorage.setItem('orderDetails',JSON.stringify(obj.ordersAll));
        }),
        catchError(this.errorHandler.handleError<any>('getDetails'))
      );
  }
}