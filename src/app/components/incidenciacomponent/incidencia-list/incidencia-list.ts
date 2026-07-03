import { Component , OnInit} from '@angular/core';
import { incidencias } from '../../../models/incidencias';
import { IncidenciasServices } from '../../../services/incidencias-services';
import { CategoriaIncidenciaServices } from '../../../services/categoria-incidencia-services';
import { DistritoServices } from '../../../services/distrito-services';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../services/login-service';

@Component({
  selector: 'app-incidencia-list',
  imports: [MatTableModule, CommonModule, MatIconModule, RouterLink],
  templateUrl: './incidencia-list.html',
  styleUrl: './incidencia-list.css',
})
export class IncidenciaList implements OnInit{
  dataSource: MatTableDataSource<incidencias> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  categorias: Map<number, string> = new Map();
  distritos: Map<number, string> = new Map();

  constructor(
    private iS: IncidenciasServices,
    private cS: CategoriaIncidenciaServices,
    private dS: DistritoServices,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarCatalogos();
    this.cargarIncidencias();
 
    if (!this.esCliente()) {
      this.displayedColumns = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
    }
 
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.cargarIncidencias();
      }
    });
  }

  esCliente(): boolean {
    return this.loginService.showRole() === 'cliente';
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
    this.iS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
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
