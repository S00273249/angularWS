import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarList } from './features/cars/pages/car-list/car-list';

@Component({
  imports: [RouterOutlet, CarList],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('angularWS');
}
