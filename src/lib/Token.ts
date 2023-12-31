import { APIService, type Filtro } from "../services/APIService";
import type { Autor, Categoria, Editora, Livro } from "../types/LivrariaTypes";

//TODO expirar token, refrescá-lo se e quando possível
export class Token {
  // 20 minutos
  private LIFETIME = 20 * 60 * 1000;

  public constructor(
    private username: string,
    private access: string,
    private refresh: string,
    private creationTimestamp: number
  ) {
    const remainingLife = this.getRemainingLife();

    setTimeout(() => {
      this.attemptRefresh();
    }, remainingLife - 1000);
  }

  cleanup() {}

  public jaExpirou() {
    return this.getRemainingLife() < 0;
  }

  public nome(): string {
    return this.username;
  }

  public acesso(): string {
    return this.access;
  }

  public async adicionarLivro(livro: object) {
    return APIService.postResource(this, "livros/", livro);
  }

  public async deletaLivro(livro: Livro) {
    return APIService.deleteResource(this, "livros/" + livro.id + "/");
  }

  public async editarLivro(livro: Livro) {
    const livroObj = livro as any;

    livroObj.categoria = livro.categoria.id;
    livroObj.editora = livro.editora.id;
    livroObj.autores = livro.autores.map((a) => a.id);

    return APIService.patchResource(this, "livros/" + livro.id + "/", livroObj);
  }

  public async adicionarAutor(nome: string) {
    return APIService.postResource(this, "autores/", { nome });
  }

  public async adicionarEditora(nome: string, site: string) {
    return APIService.postResource(this, "editoras/", { nome, site });
  }

  public async buscarLivros(filtro?: Filtro): Promise<Livro[]> {
    return APIService.getResourceFiltered(this, "livros", filtro);
  }

  public async buscarEditoras(filtro?: Filtro): Promise<Editora[]> {
    return APIService.getResourceFiltered(this, "editoras", filtro);
  }

  public async buscarAutores(filtro?: Filtro): Promise<Autor[]> {
    return APIService.getResourceFiltered(this, "autores", filtro);
  }

  public async deletaAutor(autor: Autor) {
    return APIService.deleteResource(this, "autor/" + autor.id + "/");
  }

  public async buscarCategorias(filtro?: Filtro): Promise<Categoria[]> {
    return APIService.getResourceFiltered(this, "categorias", filtro);
  }

  private async attemptRefresh() {
    const newAccessToken = await APIService.RefreshToken(this.refresh);
    this.access = newAccessToken;
  }

  private getRemainingLife(): number {
    const now = Date.now();
    const expiration = new Date(this.creationTimestamp + this.LIFETIME);
    return expiration.getTime() - now;
  }
}
