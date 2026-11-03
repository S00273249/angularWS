
import { Injectable, inject } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/v1/cars';

  // The backend requires this header.
  private headers = new HttpHeaders({
    'x-api-key': 'worksheet-dev-key'
  });

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl, {
      headers: this.headers
    });
  }

  getCarById(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`, {
      headers: this.headers
    });
  }

  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car, {
      headers: this.headers
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      if (error.status === 401 || error.status === 403) {
        console.error('Authentication issue:', error.status);
        return throwError(() => new Error(
          'You are not authorised for that action'
        ));
      }

      console.error(
        `Backend returned code ${error.status}, body was:`,
        error.error
      );
    }

    // Return an observable with a user-facing error message.
    return throwError(() => new Error(
      'Something bad happened; please try again later.'
    ));
  }
}
