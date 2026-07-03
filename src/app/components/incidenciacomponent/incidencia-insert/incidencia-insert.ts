import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { incidencias } from '../../../models/incidencias';
import { IncidenciasServices } from '../../../services/incidencias-services';
import { CategoriaIncidenciaServices } from '../../../services/categoria-incidencia-services';
import { DistritoServices } from '../../../services/distrito-services';
import { CategoriaIncidencia } from '../../../models/categoriaincidencia';
import { Distrito } from '../../../models/distrito';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-incidencia-insert',
  imports: [MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatIconModule,],
  templateUrl: './incidencia-insert.html',
  styleUrl: './incidencia-insert.css',
})
export class IncidenciaInsert implements OnInit {
 form: FormGroup = new FormGroup({});
  inc: incidencias = new incidencias();

  categorias: CategoriaIncidencia[] = [];
  distritos: Distrito[] = [];

  constructor(
    private iS: IncidenciasServices,
    private cS: CategoriaIncidenciaServices,
    private dS: DistritoServices,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => (this.categorias = data));
    this.dS.list().subscribe((data) => (this.distritos = data));

    this.form = this.formBuilder.group({
      descripcion: ['', [Validators.required, Validators.maxLength(250)]],
      fecha: ['', Validators.required],
      idUsuario: ['', [Validators.required, Validators.min(1)]],
      idCategoria: ['', Validators.required],
      idDistrito: ['', Validators.required],
      estado: [true, Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.inc.descripcion = this.form.value.descripcion;
      this.inc.fechaIncidencia = this.form.value.fecha;
      this.inc.idUsuario = this.form.value.idUsuario;
      this.inc.idCategoria = this.form.value.idCategoria;
      this.inc.idDistrito = this.form.value.idDistrito;
      this.inc.estado = this.form.value.estado;

      this.iS.insert(this.inc).subscribe({
        next: () => {
          this.router.navigate(['/incidencias/lista']);
        },
      });
    }
  }
}