import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExcluirComponent } from 'src/app/componentes/excluir/excluir.component';
import { Funcionario } from 'src/app/models/Funcionarios';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  funcionarios: Funcionario[] = [];
  funcionariosGeral: Funcionario[] = [];

  colunas = ['Situação', 'Nome', 'Sobrenome', 'Departamento', 'Ações', 'Excluir']

  constructor( private funcionarioService: FuncionarioService, public dialog: MatDialog){}

  ngOnInit(): void {
    
    this.funcionarioService.GetFuncionarios().subscribe(data => {
           
      const dados = data.dados;

      dados.map((item) => {
        item.dataDeCriacao = new Date(item.dataDeCriacao!).toLocaleString("pt-BR");
        item.dataDeAlteracao = new Date(item.dataDeAlteracao!).toLocaleString("pt-BR");
      })

      this.funcionarios = data.dados;
      this.funcionariosGeral = data.dados;
    });    
  }

  search(event : Event){
    const target = event.target as HTMLInputElement;
    const value = target.value.toLowerCase();
    
    this.funcionarios = this.funcionariosGeral.filter(funcionarios =>{
      return funcionarios.nome.toLowerCase().includes(value);
    })
  }

  OpenDialog(){
    this.dialog.open(ExcluirComponent, {
      width: '250px',
      height: '250px'
    });

  }
}
