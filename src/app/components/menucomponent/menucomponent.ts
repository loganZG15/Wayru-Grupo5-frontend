import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-menucomponent',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink, MatMenuModule, MatDividerModule],
  templateUrl: './menucomponent.html',
  styleUrl: './menucomponent.css',
})
export class Menucomponent implements OnInit {
  role: string = '';
  nombreUsuario: string = '';
  email: string = '';
  private perfilCargado = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.loginService.verificar()) {
      this.role = this.loginService.showRole() ?? '';
      this.cargarPerfil();
    }
  }


   cargarPerfil() {
    if (this.perfilCargado) {
      return;
    }

    this.loginService.getPerfil().subscribe({
      next: (data) => {
        this.nombreUsuario = data.nombreUsuario;
        this.email = data.email;
        this.perfilCargado = true;
        this.cdr.detectChanges();
      },
      error: () => {
        this.perfilCargado = true;
        this.cdr.detectChanges();
      },
    });
  }


  cerrar() {
    sessionStorage.clear();
    this.perfilCargado = false;
    this.nombreUsuario = '';
    this.email = '';
  }


  verificar(): boolean {

    const existe = this.loginService.verificar();

    if (existe) {
      this.role = this.loginService.showRole() ?? '';
    }

    return existe;
  }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  isAdmin() {
    return this.role === 'admin';
  }
  isSoporte() {
    return this.role === 'soporte';
  }
  isCliente() {
    return this.role === 'cliente';
  }
}
