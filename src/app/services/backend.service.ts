import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  url = 'http://localhost:9090/rest/';

  constructor(private http : HttpClient) { }

 getArticoloById(id: number) {
  return this.http.get(this.url + 'articolo' + id); // concatena l'id direttamente all'URL
}
  getArticoli() {
     return this.http.get(this.url + 'articolo/listAll');
  }
}
