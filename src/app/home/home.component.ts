import { Component, OnInit } from '@angular/core';
import { OfertasService } from 'src/app/ofertas.service';
import { Oferta } from 'src/shared/models/oferta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ OfertasService ]
})
export class HomeComponent implements OnInit {

  public ofertas: Array<Oferta>;

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    this.ofertasService.getOfertas()
    .then(
      (ofertas: Oferta[]) => {this.ofertas = ofertas;}
    )
    .catch(
      (param: any) => {console.log(param)}
    );
  };
}
