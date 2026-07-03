import { Component, OnInit } from '@angular/core';
import { IncidenciasServices } from '../../../services/incidencias-services';
import { CategoriaIncidenciaServices } from '../../../services/categoria-incidencia-services';
import { DistritoServices } from '../../../services/distrito-services';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { incidencias } from '../../../models/incidencias';
import { CategoriaIncidencia } from '../../../models/categoriaincidencia';
import { Distrito } from '../../../models/distrito';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-incidencia-update',
  imports: [MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatIconModule,],
  templateUrl: './incidencia-update.html',
  styleUrl: './incidencia-update.css',
})
export class IncidenciaUpdate implements OnInit {
  form: FormGroup = new FormGroup({});
  inc: incidencias = new incidencias();

  categorias: CategoriaIncidencia[] = [];
  distritos: Distrito[] = [];

  id: number = 0;

  constructor(
    private iS: IncidenciasServices,
    private cS: CategoriaIncidenciaServices,
    private dS: DistritoServices,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => (this.categorias = data));
    this.dS.list().subscribe((data) => (this.distritos = data));

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]],
      fecha: ['', Validators.required],
      idUsuario: ['', [Validators.required, Validators.min(1)]],
      idCategoria: ['', Validators.required],
      idDistrito: ['', Validators.required],
      estado: [false, Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.inc.idIncidencias = this.form.value.codigo;
      this.inc.descripcion = this.form.value.descripcion;
      this.inc.fechaIncidencia = this.form.value.fecha;
      this.inc.idUsuario = this.form.value.idUsuario;
      this.inc.idCategoria = this.form.value.idCategoria;
      this.inc.idDistrito = this.form.value.idDistrito;
      this.inc.estado = this.form.value.estado;

      this.iS.update(this.inc).subscribe({
        next: () => {
          this.router.navigate(['/incidencias/lista']);
        },
      });
    }
  }

  init() {
    this.iS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.idIncidencias,
        descripcion: data.descripcion,
        fecha: data.fechaIncidencia,
        idUsuario: data.idUsuario,
        idCategoria: data.idCategoria,
        idDistrito: data.idDistrito,
        estado: data.estado,
      });
    });
  }
}
