import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
}