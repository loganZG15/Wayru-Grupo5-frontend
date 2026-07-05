import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Distrito } from '../../../models/distrito';
import { DistritoServices } from '../../../services/distrito-services';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { LoginService } from '../../../services/login-service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-distrito-list',
  imports: [
    MatTableModule,
    CommonModule,
    MatIconModule,
    RouterLink,
    MatPaginatorModule
  ],
  templateUrl: './distrito-list.html',
  styleUrl: './distrito-list.css',
})
export class DistritoList implements OnInit {
  dataSource: MatTableDataSource<Distrito> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

    @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(private dS: DistritoServices, 
    private router: Router, 
    private loginService: LoginService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.cargarDistritos();

    if (!this.esCliente()) {
      this.displayedColumns = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.cargarDistritos();
      }
      this.cdr.detectChanges();
    });
  }

  esCliente(): boolean {
    return this.loginService.showRole() === 'cliente';
  }

  cargarDistritos() {
    this.dS.list().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        this.cdr.detectChanges();
      },
    });
  }

  eliminar(id: number) {
    this.dS.delete(id).subscribe(() => {
      this.cargarDistritos();
    });
  }}
