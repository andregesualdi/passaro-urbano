import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Pedido } from '../shared/models/pedido.model';
import { Observable } from 'rxjs';
import { URL_API } from './app.api';
import { map } from 'rxjs/operators';

@Injectable()
export class OrdemCompraService {

    constructor(private httpClient: HttpClient) {}

    public efetivarCompra(pedido: Pedido): Observable<any> {
        let headers: HttpHeaders = new HttpHeaders();
        headers.append('Content-Type', 'application/json');

        return this.httpClient.post(
            `${URL_API}/pedidos`,
            pedido,
            { headers: headers }
        )
        .pipe(
            map((resposta: any) => resposta.id)
        );
    }
}
