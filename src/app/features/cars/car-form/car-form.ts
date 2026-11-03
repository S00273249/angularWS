import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CarService } from '../services/car.service';
import { CreateCarDto } from '../models/car.model';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-car-form',
  styleUrl: './car-form.scss',
  templateUrl: './car-form.html',
})
export class CarForm {
  private formBuilder = inject(FormBuilder);
  private carService = inject(CarService);
  private router = inject(Router);

  saving = signal(false);
  saveError = signal<string | null>(null);

  carForm = this.formBuilder.nonNullable.group({
    make: ['', Validators.required],
    model: ['', Validators.required],
    year: this.formBuilder.control<number | null>(null)
  });

  onSubmit(): void {
    const { make, model, year } = this.carForm.getRawValue();

    const newCar: CreateCarDto = {
      make,
      model,
      year: year ?? undefined
    };

    this.saving.set(true);
    this.saveError.set(null);

    this.carService.addCar(newCar).subscribe({
      next: (response) => {
        console.log('Car added successfully:', response);
        this.router.navigate(['/cars']);
      },
      error: (err: Error) => {
        this.saveError.set(err.message);
        this.saving.set(false);
      }
    });
  }
}