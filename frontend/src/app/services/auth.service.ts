import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from '../models/Users';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map, catchError, tap } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:3000/auth';

  isUserLoggenIn$ = new BehaviorSubject<boolean>(this.isUserLoggedIn());

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) {}
  signup(user: Omit<User, 'id'|'otp'>): Observable<User> {
    return this.http
      .post<User>(`${this.url}/signup`, user, this.httpOptions)
      .pipe(
      first(), 
      tap((res)=>{
        localStorage.setItem('email', res.email);
        this.router.navigate(['/user-verification']);
      }),
      catchError(this.errorHandler.handleError<User>('signup')));
    
  }

  login(
    email: Pick<User, 'email'>,
    password: Pick<User, 'password'>
  ): Observable<{
    token: string;
    email: Pick<User, 'email'>
    name: Pick<User, 'name'>;
  }> {
    return this.http
      .post(`${this.url}/login`, { email, password }, this.httpOptions)
      .pipe(
        first(),
        tap((tokenObj: any) => {
          localStorage.setItem('token', tokenObj.token);
          localStorage.setItem('email', tokenObj.email);
          localStorage.setItem('name', tokenObj.name);
          this.isUserLoggenIn$.next(true);
          this.router.navigate(['/home']);
        }),
        catchError(
          this.errorHandler.handleError<{
            token: string;
            email: Pick<User, 'email'>;
            name: Pick<User, 'name'>;
          }>('login')
        )
      );
  }

  verify(otp: Pick<User, 'otp'>,
  contact: Pick<User, 'contact'>,
  email: string,
  ): Observable<{
    isVerified: boolean;
  }> {
    return this.http
      .post(`${this.url}/verify`, { otp, contact, email }, this.httpOptions)
      .pipe(first(), 
      tap((res: any)=>{
        console.log(res.isVerified);
        if(res.isVerified){
          this.router.navigate(['/login']);
          }
          }),
      catchError(this.errorHandler.handleError<{
        isVerified: boolean;
      }>('verify')));
  }

  checkStatus(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
  getUserName(): any {
    return localStorage.getItem('name');
  }
  logout(): void {
    this.isUserLoggenIn$.next(false);
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  isUserLoggedIn(): boolean {
    return !localStorage.getItem('token') ? false : true;
  }
}


