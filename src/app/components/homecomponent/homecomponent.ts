import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-homecomponent',
  imports: [RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './homecomponent.html',
  styleUrl: './homecomponent.css',
})
export class Homecomponent {
   constructor(private loginService: LoginService) {}

  estaLogueado(): boolean {
    return this.loginService.verificar();
  }
}
