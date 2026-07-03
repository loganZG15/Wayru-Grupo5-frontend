import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { incidencias } from '../models/incidencias';
import { environment } from '../environments/environment.development';
import { IncidenciaPorDistrito } from '../models/incidencia-por-distrito';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class IncidenciasServices {
  private url = `${base_url}/api/incidencias`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<incidencias[]>(`${this.url}/listar`);
  }

  insert(i: incidencias) {
    return this.http.post(`${this.url}/Crear-incidencias`, i);
  }

  listId(id: number) {
    return this.http.get<incidencias>(`${this.url}/buscar/${id}`);
  }

  update(i: incidencias) {
    return this.http.put(`${this.url}/actualizar`, i);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }

  listActivas() {
    return this.http.get<incidencias[]>(`${this.url}/activas`);
  }

  listPorDistrito(idDistrito: number) {
    return this.http.get<incidencias[]>(`${this.url}/por-distrito/${idDistrito}`);
  }

  conteoPorCategoria() {
    return this.http.get<any[]>(`${this.url}/conteo-por-categoria`);
  }
  listPorCategoria(idCategoria: number) {
    return this.http.get<incidencias[]>(`${this.url}/por-categoria/${idCategoria}`);
  }

  conteoPorDistrito() {
    return this.http.get<IncidenciaPorDistrito[]>(`${this.url}/conteo-por-distrito`);
  }

  misIncidencias() {
    return this.http.get<incidencias[]>(`${this.url}/mis-incidencias`);
  }
}
