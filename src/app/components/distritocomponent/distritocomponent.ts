import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { DistritoList } from './distrito-list/distrito-list';

@Component({
  selector: 'app-distritocomponent',
  imports: [RouterOutlet, DistritoList],
  templateUrl: './distritocomponent.html',
  styleUrl: './distritocomponent.css',
})
export class Distritocomponent {
   constructor(public route: ActivatedRoute) {}
}
