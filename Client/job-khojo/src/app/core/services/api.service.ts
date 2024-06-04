import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, headers: HttpHeaders = new HttpHeaders()): Observable<any> {
    return this.http.get(path, { headers }).pipe(catchError(this.formatErrors));
  }

  put(
    path: string,
    body: Object = {},
    headers: HttpHeaders = new HttpHeaders()
  ): Observable<any> {
    return this.http
      .put(path, body, { headers })
      .pipe(catchError(this.formatErrors));
  }

  post(
    path: string,
    body: Object = {},
    headers: HttpHeaders = new HttpHeaders()
  ): Observable<any> {
    return this.http
      .post(path, body, { headers })
      .pipe(catchError(this.formatErrors));
  }

  delete(path: string): Observable<any> {
    return this.http.delete(path).pipe(catchError(this.formatErrors));
  }
}
