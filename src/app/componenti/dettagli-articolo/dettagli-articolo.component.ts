import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-dettagli-articolo',
  standalone: false,
  templateUrl: './dettagli-articolo.component.html',
  styleUrl: './dettagli-articolo.component.css',
})
export class DettagliArticoloComponent {
  
  articolo: any;

  constructor(
    private route: ActivatedRoute,
    private backendService: BackendService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.backendService.getArticoloById(id).subscribe((data) => {
      this.articolo = data;
    });
  }
}
