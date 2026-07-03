import { Component, OnInit } from '@angular/core';
import { CategoriaIncidenciaServices } from '../../../services/categoria-incidencia-services';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaIncidencia } from '../../../models/categoriaincidencia';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-categoria-update',
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './categoria-update.html',
  styleUrl: './categoria-update.css',
})
export class CategoriaUpdate {
  form: FormGroup = new FormGroup({});
  cat: CategoriaIncidencia = new CategoriaIncidencia();
  errorMsg: string = '';
  
  id: number = 0;

  constructor(
    private cS: CategoriaIncidenciaServices,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.init();
    });

    this.form = this.formBuilder.group({
      codigo: [''],
      nombreCategoria: ['', [Validators.required, Validators.maxLength(50)]],
      subCategoria: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.cat.idCategoria = this.form.value.codigo;
      this.cat.nombreCategoria = this.form.value.nombreCategoria;
      this.cat.subCategoria = this.form.value.subCategoria;

      this.cS.update(this.cat).subscribe({
        next: () => {
          this.router.navigate(['/categorias/lista']);
        },
        error: (err) => {
          this.errorMsg =
            typeof err.error === 'string' ? err.error : 'No se pudo actualizar la categoría.';
        },
      });
    }
  }

  init() {
    this.cS.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.idCategoria,
        nombreCategoria: data.nombreCategoria,
        subCategoria: data.subCategoria,
      });
    });
  }
}
