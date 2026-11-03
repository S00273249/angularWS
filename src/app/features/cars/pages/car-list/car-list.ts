import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarService } from '../../services/car.service';
import { CarCard } from '../../components/car-card/car-card';
import { withLoadState } from '../../../../shared/load-state';

@Component({
  imports: [CarCard],
  selector: 'app-car-list',
  styleUrl: './car-list.scss',
  templateUrl: './car-list.html',
})
export class CarList {
  private carService = inject(CarService);

  state = toSignal(
    withLoadState(this.carService.getCars()),
    { requireSync: true }
  );
}
