import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CategoriaIncidencia } from '../../../models/categoriaincidencia';
import { CategoriaIncidenciaServices } from '../../../services/categoria-incidencia-services';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../services/login-service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-categoria-list',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink, MatPaginatorModule],
  templateUrl: './categoria-list.html',
  styleUrl: './categoria-list.css',
})
export class CategoriaList implements OnInit {
  dataSource: MatTableDataSource<CategoriaIncidencia> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
  private cS: CategoriaIncidenciaServices,
  private loginService: LoginService,
  private router: Router,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {
    this.cargarCategorias();

    if (!this.esCliente()) {
    this.displayedColumns = ['c1', 'c2', 'c3', 'c4', 'c5'];
  }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.cargarCategorias();
      }
      this.cdr.detectChanges();
    });
  }

  esCliente(): boolean {
  return this.loginService.showRole() === 'cliente';
}

  cargarCategorias() {
    this.cS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
    });
  }

  eliminar(id: number) {
    this.cS.delete(id).subscribe(() => {
      this.cargarCategorias();
    });
  }
}
