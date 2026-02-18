import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import '@domain/index';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'mobile';
}
