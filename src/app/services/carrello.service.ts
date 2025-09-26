import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarrelloService {
  private itemsSubject = new BehaviorSubject<any[]>([]);
  items$ = this.itemsSubject.asObservable();

  setItems(items: any[]) {
    this.itemsSubject.next(items);
  }

  aggiornaItems(items: any[]) {
    this.itemsSubject.next(items);
    localStorage.setItem('carrello', JSON.stringify(items)); // <-- aggiungi questo
  }

  getTotaleArticoli(): number {
    return this.itemsSubject
      .getValue()
      .reduce((acc, item) => acc + item.quantita, 0);
  }

  getItems(): any[] {
    return this.itemsSubject.getValue();
  }
}
