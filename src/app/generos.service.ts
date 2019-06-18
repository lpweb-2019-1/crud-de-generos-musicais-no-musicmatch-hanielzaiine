import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { DadosBaseService } from './dados-base.service';

/**
 * A classe [`GenerosService`]{@link GenerosService} é uma especialização
 * de [`DadosBaseService`]{@link DadosBaseService} que fornece
 * serviços para acessar a API e tratar com dados da entidade "gênero".
 */
@Injectable({
  providedIn: 'root'
})
export class GenerosService extends DadosBaseService {
  /** A URL da API */
  URL = 'http://localhost:8000/api/generos/';


  /**
   * Este método faz uma requisição GET para a API, com o objetivo
   * de obter a lista dos gêneros.
   */
  lista() {
    return this.http.get(this.URL)
      .pipe(
        catchError(this.handleError<any>('lista', []))
      );
  }

  /**
   * Faz uma requisição GET para a API, com o objetivo de obter os
   * dados de um gênero (identificado por `id`).
   * 
   * @param genero o identificador do gênero 
   */
  encontrar(id) {
    return this.http.get(this.URL.concat(`${id}/`));
  }

   /**
   * Este método realiza uma requisição POST à API com o objetivo de
   * cadastrar um artista.
   * 
   * Além de receber o nome do artista, o método também recebe o arquivo
   * da foto do artista. 
   * 
   * A interação com a API formata os dados para o corpo da requisição
   * POST conter o nome e os bytes do arquivo de imagem que representa 
   * a foto. Esse processo utiliza o objeto `FormData` (disponível no
   * navegador) para, de forma mais conhecida, permitir o "upload"
   * do arquivo. 
   * 
   * É importante notar que o upload é obtido com a formatação do
   * corpo da requisição HTTP. Detalhes sobre o upload (sobre como
   * a API procede ao receber os dados) estão reservados exclusivamente
   * para a própria API.
   * 
   * @param nome O nome do artista
   */
  cadastrar(nome) {
    let formData: FormData = new FormData();
    formData.append('nome', nome);

    return this.http.post(this.URL, formData);
  }

  /**
   * Este método atualiza as informações do artista, operando de forma
   * semelhante ao método `cadastrar()`, com a diferença de realizar
   * uma requisição PATCH para a API.
   * 
   * @param id O identificador do genero
   * @param nome O nome do artista
   */
  editar(id, nome) {
    let formData: FormData = new FormData();
    formData.append('nome', nome);

    return this.http.patch(this.URL.concat(`${id}/`), formData);
  }

    /**
   * Este método exclui um artista, realizando uma requisição
   * DELETE para a API.
   * 
   * @param id O identificador do genero
   */
  excluir(id) {
    return this.http.delete(this.URL.concat(`${id}/`));
  }

}
