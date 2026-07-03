import { Component, OnInit } from '@angular/core';
import { DistritoServices } from '../../../services/distrito-services';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Distrito } from '../../../models/distrito';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-distrito-update',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './distrito-update.html',
  styleUrl: './distrito-update.css',
})
export class DistritoUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  dist: Distrito = new Distrito();

  id: number = 0;

  constructor(
    private dS: DistritoServices,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      nombreDistrito: ['', [Validators.required, Validators.maxLength(50)]],
      latitud: ['', Validators.required],
      longitud: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.dist.idDistrito = this.form.value.codigo;
      this.dist.nombreDistrito = this.form.value.nombreDistrito;
      this.dist.latitud = this.form.value.latitud;
      this.dist.longitud = this.form.value.longitud;

      this.dS.update(this.dist).subscribe({
        next: () => {
          this.router.navigate(['/distritos/lista']);
        },
      });
    }
  }

  init() {
    this.dS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.idDistrito,
        nombreDistrito: data.nombreDistrito,
        latitud: data.latitud,
        longitud: data.longitud,
      });
    });
  }
}
