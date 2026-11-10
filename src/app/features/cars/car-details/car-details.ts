import { Component, inject, input, signal } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { CarService } from '../services/car.service';
import { Car } from '../models/car.model';
import { LoadState, withLoadState } from '../../../shared/load-state';

@Component({
  selector: 'app-car-details',
  imports: [RouterLink],
  templateUrl: './car-details.html',
  styleUrl: './car-details.scss',
})
export class CarDetails {
  private carService = inject(CarService);
  private router = inject(Router);

  readonly id = input.required<string>();

  readonly initial: LoadState<Car> = {
    status: 'loading'
  };

  state = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) =>
        withLoadState(this.carService.getCarById(id))
      )
    ),
    { initialValue: this.initial }
  );

  readonly deleting = signal(false);
  readonly deleteError = signal<string | null>(null);

  deleteCar(car: Car): void {
    if (!confirm(`Delete ${car.make} ${car.model}?`)) return;

    this.deleting.set(true);
    this.deleteError.set(null);

    this.carService.deleteCar(car._id).subscribe({
      next: () => this.router.navigate(['/cars']),
      error: (err: Error) => {
        this.deleteError.set(err.message);
        this.deleting.set(false);
      },
    });
  }
}