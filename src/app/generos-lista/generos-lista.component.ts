import { Component, OnInit } from '@angular/core';
import { GenerosService } from '../generos.service';
import { Router } from '@angular/router';

/**
 * O componente `GenerosListaComponent` implementa funcionalidades de
 * gerenciamento dos generos:
 * 
 * * lista (consulta)
 * * exclusão (após confirmação do usuário)
 * * acesso à funcionalidade de edição (componente [`EditarGeneroComponent`]{@link EditarGeneroComponent})
 */
@Component({
  selector: 'app-generos-lista',
  templateUrl: './generos-lista.component.html',
  styleUrls: ['./generos-lista.component.css']
})
export class GenerosListaComponent implements OnInit {
  /** A lista de generos */
  generos = null

  /** Uma variável de controle sobre o resultado da exclusão de genero */
  resultadoExcluir = null;
  
  /**
   * O construtor injeta uma instância de `GenerosService` e `Router`
   * 
   * @param generos$ Uma instância de `GenerosService`
   * @param router Uma instância de `Router`
   */
  constructor(private generos$: GenerosService, private router: Router) { }


    /**
   * É sobrecarregado para acessar a lista de artistas quando o componente for iniciado.
   */
  ngOnInit() {
    this.atualizarLista();
  }


    /**
   * Este método usa o serviço `GenerosService` para obter a lista de artistas. 
   * Quando houver retorno, armazena o resultado no atributo `genero`.
   */
  atualizarLista() {
    this.generos$.lista()
      .subscribe(
        lista => this.generos = lista.results
      );
  }

    /**
   * Este método exclui um genero, de acordo com confirmação do usuário. Ao excluir, atualiza a lista de generos.
   * 
   * @param artista O genero que será excluído
   */
  excluir(genero) {
    if (confirm(`Tem certeza que deseja excluir o genero "${genero.nome}" ?\nEssa ação não é reversível!`)) {
      this.generos$.excluir(genero.id)
        .subscribe(
          _ => {
            this.resultadoExcluir = true;
            this.atualizarLista();
          },
          err => {
            this.resultadoExcluir = err.error;
          }
        )
    }
  }

  /**
   * Este método realiza navegação para a funcionalidade de edição do genero.
   * 
   * @param genero O genero que será editado
   */
  editar(genero) {
    this.router.navigate(['generos', genero.id, 'editar']);
  }

   /**
   * Este método realiza navegação para a funcionalide de consulta do genero.
   * 
   * @param genero O artista que será consultado
   */
  consultar(genero) {
    this.router.navigate(['generos', genero.id]);
  }
}
