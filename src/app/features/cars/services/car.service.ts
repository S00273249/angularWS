import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';

@Service()
export class CarService {
    private http = inject(HttpClient);

    private apiUrl = 'http://localhost:3000/cars'; // this should be read from an env variable we will leave it for now.

    getCars(): Observable<Car[]> {
        return this.http.get<Car[]>(this.apiUrl)
    }

}
