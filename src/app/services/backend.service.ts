import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  url = 'http://localhost:9090/rest/';

  constructor(private http : HttpClient) { }

  getArticoli() {
     return this.http.get(this.url + 'articolo/listAll');
  }
}
