import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  url = 'http://localhost:9090/rest/';

  constructor(private http: HttpClient) { }

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

  updateMarca(body: {}) {
    console.log(body);
    return this.http.put(this.url + 'marca/updateMarca', body);
  }

  removeMarca(marca: any) {
    return this.http.request('delete', this.url + 'marca/deleteMarca', { body: marca });
  }

  createMarca(body: any) {
    return this.http.post(this.url + 'marca/createMarca', body);
  }




  getAllGeneri() {
    return this.http.get(this.url + 'genere/listAll');
  }

  getAllTaglieIndumento() {
    return this.http.get(this.url + 'taglia/listAll');
  }

  createArticoloIndumento(body: any) {
    return this.http.post(this.url + 'articolo/createIndumento', body);
  }

  createArticoloScarpa(body: any) {
    return this.http.post(this.url + 'articolo/createScarpa', body);
  }

  aggiungiAlCarrello(utenteId: number, articoloId: number) {
    const body = { articoloId, quantita: 1 };
    return this.http.post(`${this.url}carrello/${utenteId}/items`, body);
  }

  updateCategoria(body: any) {
    console.log(body);
    return this.http.put(this.url + 'categoria/updateCategoria', body);
  }

  removeCategoria(categoria: any) {
    return this.http.request('delete', this.url + 'categoria/deleteCategoria', { body: categoria });
  }

  createCategoria(body: any) {
    return this.http.post(this.url + 'categoria/createCategoria', body);
  }

}
