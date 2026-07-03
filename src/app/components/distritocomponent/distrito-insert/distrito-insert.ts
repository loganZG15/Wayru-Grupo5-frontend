import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Distrito } from '../../../models/distrito';
import { DistritoServices } from '../../../services/distrito-services';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-distrito-insert',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './distrito-insert.html',
  styleUrl: './distrito-insert.css',
})
export class DistritoInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  dist: Distrito = new Distrito();

  constructor(
    private dS: DistritoServices,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombreDistrito: ['', [Validators.required, Validators.maxLength(50)]],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.dist.nombreDistrito = this.form.value.nombreDistrito;
      this.dist.latitud = this.form.value.latitud;
      this.dist.longitud = this.form.value.longitud;

      this.dS.insert(this.dist).subscribe({
        next: () => {
          this.router.navigate(['/distritos/lista']);
        },
      });
    }
  }
}
