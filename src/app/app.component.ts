import { Component, OnInit,Inject } from '@angular/core';
import { environment } from '../environments/environment';
import { Client } from "../models/client.model";
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {EstadoService} from '../services/estado.service';
import { Estado } from '../models/estado.model';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-root',
  standalone: true,  // Verifique a compatibilidade da versão do Angular
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, FormsModule],
})
export class AppComponent implements OnInit {
  estados$!: Observable<Estado[]>;
  clientes$!: Observable<Client[]>;
  clientesFiltrados$!: Observable<Client[]>;

  // Campos do formulário
  id = '';
  cidade = '';
  nome = '';
  cep = '';
  estado!:number;

  // Variáveis de filtro
  filtroCidade: string = '';
  filtroEstado: string = '';
  filtroCep: string = '';

  constructor(
    private clientService: ClientService,
    private estadoService: EstadoService,
  ) {}

  ngOnInit(): void {
    this.obterEstadosCadastrados();
    this.obterClientesCadastrados();
  }

  obterClientesCadastrados() {
    this.clientes$ = this.clientService.obterClientes();
  }

  obterEstadosCadastrados() {
    this.estados$ = this.estadoService.obter();
  }

  //Cadastra um novo cliente
  cadastrarClientes() {
   this.clientService.cadastrarClientes({
         cep: this.cep,
         cidade: this.cidade,
         nome: this.nome,
         estado: { id: this.estado, sigla: '', nome: '' } // Enviar o estado como um objeto contendo o ID
       }).subscribe(() => this.obterClientesCadastrados());
     console.log('Cadastrando cliente:', this.nome, this.cidade, this.cep, this.estado);
  }
 preencherCampos(cliente:Client){
  this.id = cliente.id!.toString();
   this.cep = cliente.cep;
   this.cidade = cliente.cidade;
   this.nome = cliente.nome;
   this.estado = cliente.estado.id;
  
 }

atualizar(){
  this.clientService.editarClientes({ 
    id:parseInt(this.id),
    cep:this.cep,
    cidade:this.cidade,
    nome: this.nome,
    estado:{ id: this.estado, sigla: '', nome: '' }})
    .subscribe(_ => this.obterClientesCadastrados());
  }
  remover(id:number){
    this.clientService.remover(id)
    .subscribe(_ => this.obterClientesCadastrados());
  }
  obterClientesFiltrados() {
    this.clientesFiltrados$ = this.clientService.filtrarClientes({
      cidade: this.filtroCidade,
      estado: this.filtroEstado,
      cep: this.filtroCep,
    });
  }

  aplicarFiltro() {
    this.obterClientesFiltrados();
  }

  limparFiltro() {
    this.filtroCidade = '';
    this.filtroEstado = '';
    this.filtroCep = '';
    this.obterClientesFiltrados();
  }




}

