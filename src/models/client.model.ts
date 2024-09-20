import { Estado } from "./estado.model";

export interface Client
{
    id?:number ,
    nome:string,
    cidade:string,
    cep:string,
    estado:Estado
  }

