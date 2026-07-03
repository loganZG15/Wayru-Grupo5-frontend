import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoriaIncidencia } from '../../../models/categoriaincidencia';
import { CategoriaIncidenciaServices } from '../../../services/categoria-incidencia-services';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from "@angular/material/select";

@Component({
  selector: 'app-categoria-search',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    CommonModule,
    MatSelectModule
],
  templateUrl: './categoria-search.html',
  styleUrl: './categoria-search.css',
})
export class CategoriaSearch implements OnInit {
  form: FormGroup;
  categorias: CategoriaIncidencia[] = [];

  dataSource: MatTableDataSource<CategoriaIncidencia> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3'];
  buscado = false;

  constructor(
    private cS: CategoriaIncidenciaServices, 
    private formBuilder: FormBuilder, 
    private cdr: ChangeDetectorRef) {
    this.form = this.formBuilder.group({
      idCategoria: [''],
    });
  }

  ngOnInit(): void {
    this.cS.list().subscribe((data) => {
      this.categorias = data;
      this.cdr.detectChanges();
    });
  }

  buscar(): void {
    const idCategoria = this.form.value.idCategoria;
    if (idCategoria) {
      this.cS.listId(idCategoria).subscribe({
        next: (data) => {
          this.dataSource.data = data ? [data] : [];
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
}
