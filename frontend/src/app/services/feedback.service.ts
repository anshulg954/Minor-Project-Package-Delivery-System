import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, tap, catchError } from 'rxjs';

import { Feedback } from '../models/Users';

import { ErrorHandlerService } from './error-handler.service';


@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private url = 'http://localhost:3000/feedback';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) {}

  createDetailsForFeedback(fb:Feedback): Observable<Feedback> {
    return this.http
      .post<any>(`${this.url}/generateFeedback`, fb, this.httpOptions)
      .pipe(
      first(), 
      tap((res)=>{
        this.router.navigate(['/show-customer-feedbacks']);
      }),
      catchError(this.errorHandler.handleError<any>('generateFeedback')));
  }

  getDetails(email:string): Observable<any> {
    return this.http
      .post<any>(`${this.url}/fetchFeedbacks`, [{"email":email}], this.httpOptions)
      .pipe(
      first(), 
      tap((res)=>{
        console.log(res);
      }),
      catchError(this.errorHandler.handleError<any>('fetchFeedbacks')));
  }
}
