import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { UserDetails } from '../models/Users';
import { Observable } from 'rxjs';
import { first, map, catchError, tap } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {
  private url = 'http://localhost:3000/user';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) {}
  addDetails(user:UserDetails): Observable<UserDetails> {
    return this.http
      .post<UserDetails>(`${this.url}/addDetails`, user, this.httpOptions)
      .pipe(
      first(), 
      tap(()=>{
        this.router.navigate(['/show-user-details']);
      }),
      catchError(this.errorHandler.handleError<UserDetails>('addDetails')));
  }

  getDetails(email:string): Observable<[]> {
    console.log(email);
    return this.http
      .post<[]>(`${this.url}/getDetails`, {"email": email}, this.httpOptions)
      .pipe(
        first(),
        catchError(this.errorHandler.handleError<[]>('getDetails'))
      );
  }

}
