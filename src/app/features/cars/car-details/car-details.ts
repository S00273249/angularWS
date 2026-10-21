import { Component, inject, input, signal, OnInit } from '@angular/core';
import { CarService } from '../services/car.service';
import { Car } from '../models/car.model';

@Component({
  selector: 'app-car-details',
  imports: [],
  templateUrl: './car-details.html',
  styleUrl: './car-details.scss',
})
export class CarDetails implements OnInit {
  id = input.required<string>();

  private carService = inject(CarService);

  car = signal<Car | null>(null);
  errorMessage = signal('');

  ngOnInit(): void {
    this.carService.getCarById(this.id()).subscribe({
      next: (car) => {
        console.log('Car received:', car);
        this.car.set(car);
      },
      error: (error) => {
        console.error('Error fetching car details:', error);
        this.errorMessage.set('Unable to load car details.');
      }
    });
  }
}