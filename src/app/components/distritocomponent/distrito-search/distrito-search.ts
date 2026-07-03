import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Distrito } from '../../../models/distrito';
import { DistritoServices } from '../../../services/distrito-services';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from "@angular/material/select";


@Component({
  selector: 'app-distrito-search',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTableModule,
    CommonModule,
    MatSelectModule
],
  templateUrl: './distrito-search.html',
  styleUrl: './distrito-search.css',
})
export class DistritoSearch implements OnInit {
  form: FormGroup;
  distritos: Distrito[] = [];

  dataSource: MatTableDataSource<Distrito> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  buscado = false;

  constructor(
    private dS: DistritoServices,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.formBuilder.group({
      idDistrito: [''],
    });
  }
  
  ngOnInit(): void {
    this.dS.list().subscribe((data) => {
      this.distritos = data;
      this.cdr.detectChanges();
    });
  }

  buscar(): void {
    const idDistrito = this.form.value.idDistrito;
    if (idDistrito) {
      this.dS.listId(idDistrito).subscribe({
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
