import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  
  url = 'http://localhost:9090/rest/';

  constructor(private http: HttpClient) {}

  getArticoloById(id: number) {
    return this.http.get(this.url + 'articolo/getArticolo', { params: { id } });
  }

  getArticoli() {
    return this.http.get(this.url + 'articolo/listAll');
  }

  updateArticolo(body: {}) {
    console.log(body);
    return this.http.put(this.url + 'articolo/updateArticolo', body);
  }

  removeArticolo(id: number) {
    const params = new HttpParams().set('id', id.toString());
    return this.http.delete(this.url + 'articolo/deleteArticolo', { params });
  }

  getAllCategorie() {
    return this.http.get(this.url + 'categoria/listAll');
  }

  getAllMarche() {
    return this.http.get(this.url + 'marca/listAll');
  }

  getAllGeneri() {
    return this.http.get(this.url + 'genere/listAll');
  }

  getAllTaglieIndumento() {
    return this.http.get(this.url + 'taglia/listAll');
  }
}

