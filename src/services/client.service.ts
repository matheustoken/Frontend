
import {environment} from "../environments/environment"
import { HttpClient, HttpResponse  } from '@angular/common/http';

import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from "../models/client.model";
import { HttpParams } from '@angular/common/http';

export type EntityResponseType = HttpResponse<Client>;
export type EntityArrayResponseType = HttpResponse<Client[]>;

@Injectable({
  providedIn:'root'

  })

export class ClientService {
  protected http = inject(HttpClient);

  private url = `${environment.api}/clientes`;
  constructor( private httpClient:HttpClient){}

  obterClientes():Observable<Client[]>{
    if(environment.production === false) {
      console.log('Iniciando requisicao para obter clientes');
    }
    return this.httpClient.get<Client[]>(this.url);
    }
  cadastrarClientes(cliente: Client){
    console.log('Iniciando requisicao para cadastrar cliente:', cliente);
    return this.httpClient.post<Client>(this.url, cliente);
  }
 editarClientes(cliente: Client){
  return this.httpClient.put<Client>(`${this.url}/${cliente.id}`, cliente);
   }
  remover(id:number){
    return this.httpClient.delete<void>(`${this.url}/${id}`);
  }

  filtrarClientes(filtros?: { cidade?: string; estado?: string; cep?: string }): Observable<Client[]> {
    let params = new HttpParams();
    
    if (filtros?.cidade) {
      params = params.append('cidade', filtros.cidade);
    }
    if (filtros?.estado) {
      params = params.append('estado', filtros.estado);
    }
    if (filtros?.cep) {
      params = params.append('cep', filtros.cep);
    }
  
    return this.httpClient.get<Client[]>(this.url, { params });
  }


 
  }

