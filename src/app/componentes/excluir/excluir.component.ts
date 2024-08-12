import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Funcionario } from 'src/app/models/Funcionarios';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluir.component.html',
  styleUrls: ['./excluir.component.css']
})
export class ExcluirComponent implements OnInit{

  inputdata: any;
  funcionario!: Funcionario;
  constructor(
    private FuncionarioService: FuncionarioService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref:MatDialogRef<ExcluirComponent>
  ){
    

  }

  ngOnInit(): void {
    this.inputdata = this.data
    
    this.FuncionarioService.GetFuncionario(this.inputdata.id).subscribe((data) =>{
      this.funcionario = data.dados;

      console.log(this.funcionario)
    })
  }

  Excluir(){
    this.FuncionarioService.ExcluirFuncionario(this.inputdata.id).subscribe((data) =>{
      this.ref.close();
      window.location.reload();
    })
  }

  Cancelar(){
    this.ref.close();
  }
}
