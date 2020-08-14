import { Oferta } from "../shared/models/oferta.model"
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from './app.api';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

@Injectable()
export class OfertasService {

    constructor(private httpClient: HttpClient) { }

    public getOfertas(): Promise<Oferta[]> {
         return this.httpClient.get(`${URL_API}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta: any) => resposta); //Change any to response (how it works in Angular 11?)
    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]> {
        return this.httpClient.get(`${URL_API}/ofertas?categoria=${categoria}`).toPromise().then((resposta: any) => resposta);
    }

    public getOfertaPorId(id: number): Promise<Oferta> {
        return this.httpClient.get(`${URL_API}/ofertas?id=${id}`)
           .toPromise()
           .then((resposta: any) => resposta.shift());
   }

   public getComoUsarPorId(id: number): Promise<any> {
        return this.httpClient.get(`${URL_API}/como-usar?id=${id}`)
            .toPromise()
            .then((resposta: any) => resposta.shift().descricao);
   }

   public getOndeFicaPorId(id: number): Promise<any> {
        return this.httpClient.get(`${URL_API}/onde-fica?id=${id}`)
            .toPromise()
            .then((resposta: any) => resposta.shift().descricao);
   }

   public pesquisaOfertas(termo: string): Observable<Oferta[]> {
        return this.httpClient.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`) //JSON-server uses _like to search
            .pipe(
                retry(10),
                map((resposta: any) => { return resposta; })
            );
   }
}
