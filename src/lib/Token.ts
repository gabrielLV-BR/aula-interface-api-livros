import { APIService, type Filtro } from "../services/APIService";
import type { Autor, Categoria, Editora, Livro } from "../types/LivrariaTypes";

//TODO expirar token, refrescá-lo se e quando possível
export class Token {
  public constructor(
    private username: string,
    private access: string,
    private refresh: string
  ) {
    setTimeout(() => {
      this.attemptRefresh();
    }, 30 * 60 * 1000);
  }

  cleanup() {}

  public getUsername(): string {
    return this.username;
  }

  public getAccessCode(): string {
    return this.access;
  }

  public async getLivros(filtro?: Filtro): Promise<Livro[]> {
    return APIService.getResourceFiltered(this, "livros", filtro);
  }

  public async getEditoras(filtro?: Filtro): Promise<Editora[]> {
    return APIService.getResourceFiltered(this, "editoras", filtro);
  }

  public async getAutores(filtro?: Filtro): Promise<Autor[]> {
    return APIService.getResourceFiltered(this, "autores", filtro);
  }

  public async getCategorias(filtro?: Filtro): Promise<Categoria[]> {
    return APIService.getResourceFiltered(this, "categorias", filtro);
  }

  private async attemptRefresh() {
    const newAccessToken = await APIService.RefreshToken(this.refresh);
    this.access = newAccessToken;
  }
}
