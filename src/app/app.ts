import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loading } from './shared/components/loading/loading';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Loading],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('real-estate-front-end');
}
