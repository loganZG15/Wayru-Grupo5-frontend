import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { incidencias } from '../../../models/incidencias';
import { IncidenciasServices } from '../../../services/incidencias-services';
import { CategoriaIncidenciaServices } from '../../../services/categoria-incidencia-services';
import { DistritoServices } from '../../../services/distrito-services';
import { CategoriaIncidencia } from '../../../models/categoriaincidencia';
import { Distrito } from '../../../models/distrito';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-incidencia-search',
  imports: [MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    CommonModule,],
  templateUrl: './incidencia-search.html',
  styleUrl: './incidencia-search.css',
})
export class IncidenciaSearch implements OnInit {
  form: FormGroup = new FormGroup({});

  categorias: CategoriaIncidencia[] = [];
  distritos: Distrito[] = [];

  categoriasMap: Map<number, string> = new Map();
  distritosMap: Map<number, string> = new Map();

  dataSource: MatTableDataSource<incidencias> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5'];
  buscado = false;

  constructor(
    private iS: IncidenciasServices,
    private cS: CategoriaIncidenciaServices,
    private dS: DistritoServices,
    private formBuilder: FormBuilder, 
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.categorias = data;
      data.forEach((c) => this.categoriasMap.set(c.idCategoria, c.nombreCategoria));
      this.cdr.detectChanges();
    });
    this.dS.list().subscribe((data) => {
      this.distritos = data;
      data.forEach((d) => this.distritosMap.set(d.idDistrito, d.nombreDistrito));
      this.cdr.detectChanges();
    });

    this.form = this.formBuilder.group({
      idDistrito: [''],
      idCategoria: [''],
    });
  }

  buscarPorDistrito(): void {
    const idDistrito = this.form.value.idDistrito;
    if (idDistrito) {
      this.iS.listPorDistrito(idDistrito).subscribe({
        next: (data) => {
          this.dataSource.data = data;
          this.buscado = true;
          this.cdr.detectChanges();
        },
        error: () => {
          this.dataSource.data = [];
          this.buscado = true;
          this.cdr.detectChanges();
        },
      });
    }
  }

  buscarPorCategoria(): void {
    const idCategoria = this.form.value.idCategoria;
    if (idCategoria) {
      this.iS.listPorCategoria(idCategoria).subscribe({
        next: (data) => {
          this.dataSource.data = data;
          this.buscado = true;
          this.cdr.detectChanges();
        },
        error: () => {
          this.dataSource.data = [];
          this.buscado = true;
          this.cdr.detectChanges();
        },
      });
    }
  }

  nombreCategoria(id: number): string {
    return this.categoriasMap.get(id) ?? '—';
  }

  nombreDistrito(id: number): string {
    return this.distritosMap.get(id) ?? '—';
  }
}
