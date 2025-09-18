import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  
  url = 'http://localhost:9090/rest/';

  constructor(private http: HttpClient) {}

  getArticoloById(id: number) {
    return this.http.get(this.url + 'articolo/getArticolo', {
      params: { id },
    });
  }

  getArticoli() {
    return this.http.get(this.url + 'articolo/listAll');
  }

  updateArticoloScarpa(body:{}){
    console.log(body);
    return this.http.put(this.url + 'articolo/updateScarpa', body);
  }

  removeArticolo(body:{}){
    return this.http.post(this.url + 'articolo/deleteArticolo', body);
  }
}
