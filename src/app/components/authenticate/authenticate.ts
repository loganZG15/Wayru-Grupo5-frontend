import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login-service';
import { Router } from '@angular/router';
import { JwtRequestDTO } from '../../models/jwt-request-dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-authenticate',
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './authenticate.html',
  styleUrl: './authenticate.css',
})
export class Authenticate implements OnInit {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  username: string = '';
  password: string = '';
  mensaje: string = '';
  ngOnInit(): void { }

  login() {
    const request = new JwtRequestDTO();
    request.username = this.username;
    request.password = this.password;

    this.loginService.login(request).subscribe({
      next: (data: any) => {
        sessionStorage.setItem('token', data.jwttoken);
        this.router.navigate(['homes']);
      },
      error: (error) => {
        console.log(error);

        if (error.status === 401) {
          this.snackBar.open(
            'Usuario o contraseña incorrectos',
            'Cerrar',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            }
          );
        } else {
          this.snackBar.open(
            'Ocurrió un error al iniciar sesión',
            'Cerrar',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            }
          );
        }
      }
    });
  }
}
