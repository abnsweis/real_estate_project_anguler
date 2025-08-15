import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Loading } from './shared/loading/loading';
import { SharedModule } from './shared/shared-module';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule],
  templateUrl: './app.html'
})
export class App {
  protected readonly title = signal('real-estate-front-end');
}
