import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { CategoriaList } from './categoria-list/categoria-list';

@Component({
  selector: 'app-categoriacomponent',
  imports: [RouterOutlet, CategoriaList],
  templateUrl: './categoriacomponent.html',
  styleUrl: './categoriacomponent.css',
})
export class Categoriacomponent {
   constructor(public route: ActivatedRoute) {}
}
