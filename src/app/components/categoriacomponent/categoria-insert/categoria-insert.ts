import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaIncidencia } from '../../../models/categoriaincidencia';
import { CategoriaIncidenciaServices } from '../../../services/categoria-incidencia-services';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-categoria-insert',
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './categoria-insert.html',
  styleUrl: './categoria-insert.css',
})
export class CategoriaInsert implements OnInit {
  form: FormGroup = new FormGroup({});
  cat: CategoriaIncidencia = new CategoriaIncidencia();
  errorMsg: string = '';

  constructor(
    private cS: CategoriaIncidenciaServices,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombreCategoria: ['', [Validators.required, Validators.maxLength(50)]],
      subCategoria: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  aceptar(): void {
    this.errorMsg = '';
    if (this.form.valid) {
      this.cat.nombreCategoria = this.form.value.nombreCategoria;
      this.cat.subCategoria = this.form.value.subCategoria;

      this.cS.insert(this.cat).subscribe({
        next: () => {
          this.router.navigate(['/categorias/lista']);
        },
        error: (err) => {
          this.errorMsg =
            typeof err.error === 'string' ? err.error : 'No se pudo registrar la categoría.';
        },
      });
    }
  }
}
