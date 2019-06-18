import { Component, OnInit } from '@angular/core';
import { GenerosService } from '../generos.service';
import { ValicacaoFormUtilService } from '../valicacao-form-util.service';

/**
 * O componente `CadastrarArtistaComponent` implementa a funcionalidade de cadastrar
 * artista. Para isso, utiliza o serviço [`GenerosService`]{@link GenerosService}.
 * 
 * @see GenerosService
 * @see ValicacaoFormUtilService
 */

@Component({
  selector: 'app-cadastrar-genero',
  templateUrl: './cadastrar-genero.component.html',
  styleUrls: ['./cadastrar-genero.component.css']
})
export class CadastrarGeneroComponent implements OnInit {
    /** Atributo vinculado ao campo do nome do genero */
    nome = null;

    /**
     * O construtor inje ainstâncias de `GenerosService` e `ValidacacaoFormUtilService`
     * 
     * @param generos$ Uma instância de GenerosService
     * @param validacao$ Uma instancia de ValidacacaoFormUtilService
     */

  constructor(private generos$: GenerosService,
    private validacao$: ValicacaoFormUtilService) { }

  ngOnInit() {
  }

  /**
   * Este método utiliza o método [`cadastrar()`]{@link GenerosService#cadastrar}
   * para cadastrar um genero, utilizando os atributos `nome`.
   * 
   * Quando obtiver um resultado do método, faz um tratamento para lidar com situação
   * de erro ou sucesso.
   */
  salvar() {
    this.generos$.cadastrar(this.nome)
      .subscribe(
        data => this.validacao$.erro = false,
        err => this.validacao$.erro = err.error
      );
  }
}
