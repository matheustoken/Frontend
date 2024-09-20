
import {environment} from "../environments/environment"
import { HttpClient, HttpResponse  } from '@angular/common/http';
import {Estado} from "../models/estado.model";
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export type EntityResponseType = HttpResponse<Estado>;
export type EntityArrayResponseType = HttpResponse<Estado[]>;

@Injectable({
  providedIn:'root'

  })

export class EstadoService{
    protected http = inject(HttpClient);
    private url = `${environment.api}/estados`;


  obter():Observable<Estado[]>{
    console.log('Iniciando requisição para obter estados');
    return this.http.get<Estado[]>(this.url)
  }

    }
