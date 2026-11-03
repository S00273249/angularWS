
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService } from '../services/car.service';
import { Car } from '../models/car.model';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-car-form',
  styleUrl: './car-form.scss',
  templateUrl: './car-form.html',
})
export class CarForm {

  private formBuilder = inject(FormBuilder);
  private carService = inject(CarService);
  private router = inject(Router);

  carForm = this.formBuilder.group({
    make: ['', Validators.required],
    model: ['', Validators.required],
    year: ['']
  });

  onSubmit(): void {
    const carData: Car = this.carForm.value as Car;

    console.log('Submitted Car:', carData);

    this.carService.addCar(carData).subscribe({
      next: (response) => {
        console.log('Car added successfully:', response);

        this.router.navigate(['/cars']);
      },
      error: (error) => {
        console.error('Error adding car:', error);
      }
    });
  }
}
