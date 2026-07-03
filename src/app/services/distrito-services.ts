import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Distrito } from '../models/distrito';
import { environment } from '../environments/environment.development';

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class DistritoServices {
  private url = `${base_url}/api/distrito`;

  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Distrito[]>(`${this.url}/listar`);
  }

  insert(d: Distrito) {
    return this.http.post(`${this.url}/crear-distritos`, d);
  }

  listId(id: number) {
    return this.http.get<Distrito>(`${this.url}/buscar/${id}`);
  }

  buscarPorNombre(nombre: string) {
    return this.http.get<Distrito>(`${this.url}/buscar`, {
      params: { nombre },
    });
  }

  update(d: Distrito) {
    return this.http.put(`${this.url}/actualizar`, d);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`, { responseType: 'text' });
  }
}
