import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';
import { Oferta } from '../../shared/models/oferta.model';
import { OfertasService } from '../ofertas.service';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>;
  private subjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    this.ofertas = this.subjectPesquisa
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((termo: string) => {

          if (termo.trim() === '') {
            return of<Oferta[]>([]);
          }

          return this.ofertasService.pesquisaOfertas(termo);
        }),
        catchError((err: any) => {
          console.log(err);
          return of<Oferta[]>([]);
        })
      )
  }

  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca);

    // this.ofertas = this.ofertasService.pesquisaOfertas(termoDaBusca);

    // this.ofertas.subscribe(
    //   (ofertas: Oferta[]) => console.log(ofertas),
    //   (erro: any) => console.log('Error status: ', erro.status),
    //   () => console.log('Terminou')
    // );
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('');
  }
}
