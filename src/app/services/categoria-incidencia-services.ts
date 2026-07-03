import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoriaIncidencia } from '../models/categoriaincidencia';
import { environment } from '../environments/environment.development';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class CategoriaIncidenciaServices {
  private url = `${base_url}/api/categoria-incidencia`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<CategoriaIncidencia[]>(`${this.url}/listar`);
  }

  insert(c: CategoriaIncidencia) {
    return this.http.post(`${this.url}/Crear-categorias-incidencias`, c);
  }

  listId(id: number) {
    return this.http.get<CategoriaIncidencia>(`${this.url}/buscar/${id}`);
  }

  update(c: CategoriaIncidencia) {
    return this.http.put(`${this.url}/actualizar`, c);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
  
  buscarPorNombre(nombre: string) {
    return this.http.get<CategoriaIncidencia[]>(`${this.url}/por-nombre`, {
      params: { nombre },
    });
  }
}
