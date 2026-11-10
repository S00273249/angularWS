import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CarService } from '../services/car.service';
import { CreateCarDto } from '../models/car.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatProgressBarModule
  ],
  selector: 'app-car-form',
  styleUrl: './car-form.scss',
  templateUrl: './car-form.html',
})
export class CarForm {
  private formBuilder = inject(FormBuilder);
  private carService = inject(CarService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  saving = signal(false);
  saveError = signal<string | null>(null);

  readonly currentYear = new Date().getFullYear();

  carForm = this.formBuilder.nonNullable.group({
    make: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30)
    ]],
    model: ['', [
      Validators.required,
      Validators.maxLength(30)
    ]],
    year: this.formBuilder.control<number | null>(null, [
      Validators.min(1950),
      Validators.max(this.currentYear + 1)
    ])
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
    this.carForm.disable();

    this.carService.addCar(newCar).subscribe({
      next: (response) => {
        this.snackBar.open(`${newCar.make} ${newCar.model} saved`, 'Close', { duration: 10000 });
        console.log('Car added successfully:', response);
        this.router.navigate(['/cars']);
      },
      error: (err: Error) => {
        this.saveError.set(err.message);
        this.saving.set(false);
        this.carForm.enable();
      }
    });
  }
}