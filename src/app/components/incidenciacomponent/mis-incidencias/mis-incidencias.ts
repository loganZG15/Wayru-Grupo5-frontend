import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { IncidenciasServices } from '../../../services/incidencias-services';
import { CategoriaIncidenciaServices } from '../../../services/categoria-incidencia-services';
import { DistritoServices } from '../../../services/distrito-services';
import { incidencias } from '../../../models/incidencias';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-mis-incidencias',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatPaginatorModule],
  templateUrl: './mis-incidencias.html',
  styleUrl: './mis-incidencias.css',
})
export class MisIncidencias implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<incidencias> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];

  categorias: Map<number, string> = new Map();
  distritos: Map<number, string> = new Map();

   @ViewChild(MatPaginator) paginator!: MatPaginator;
   
  constructor(
    private iS: IncidenciasServices,
    private cS: CategoriaIncidenciaServices,
    private dS: DistritoServices,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
  this.dataSource.paginator = this.paginator;
}

  ngOnInit(): void {
    this.cargarCatalogos();
    this.cargarIncidencias();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.cargarIncidencias();
      }
    });
  }

  cargarCatalogos() {
    this.cS.list().subscribe({
      next: (data) => data.forEach((c) => this.categorias.set(c.idCategoria, c.nombreCategoria)),
    });
    this.dS.list().subscribe({
      next: (data) => data.forEach((d) => this.distritos.set(d.idDistrito, d.nombreDistrito)),
    });
  }

  cargarIncidencias() {
  this.iS.misIncidencias().subscribe({
    next: (data) => {
      this.dataSource.data = data;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      this.cdr.detectChanges();
    },
    error: () => {
      this.dataSource.data = [];
      this.cdr.detectChanges();
    },
  });
}

  nombreCategoria(id: number): string {
    return this.categorias.get(id) ?? '—';
  }

  nombreDistrito(id: number): string {
    return this.distritos.get(id) ?? '—';
  }

  eliminar(id: number) {
    this.iS.delete(id).subscribe(() => {
      this.cargarIncidencias();
    });
  }
}
