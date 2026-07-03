import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-menucomponent',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink, MatMenuModule],
  templateUrl: './menucomponent.html',
  styleUrl: './menucomponent.css',
})
export class Menucomponent {
  role: string = '';
  usuario: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  cerrar() {
    sessionStorage.clear();
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
