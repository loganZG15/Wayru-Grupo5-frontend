import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { IncidenciaList } from './incidencia-list/incidencia-list';
@Component({
  selector: 'app-incidenciacomponent',
  imports: [RouterOutlet, IncidenciaList],
  templateUrl: './incidenciacomponent.html',
  styleUrl: './incidenciacomponent.css',
})
export class Incidenciacomponent {
  constructor(public route: ActivatedRoute) {}
}
