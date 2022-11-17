import AbstractView from "./AbstractView";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Cadastro de Filmes");
    }

    async getHtml() {
        return `

            <form class="form mb-5 sm-flex p-5">
                <h1 class="titulo">Cadastro de Filmes</h1>
                <div class=class="form-row form">

                    <div class="form-group col-md-6">
                        <label for="inputNome">Nome do Filme:</label>
                        <input type="text" class="form-control form-control-lg" id="nome" placeholder="Nome do Filme" autocomplete="off"/>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="inpuntGenero">Nome do Filme:</label>
                        <input type="text" class="form-control form-control-lg" id="genero" placeholder="Gênero"/>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="selectClassificacao">Classificação:</label>
                        <select class="form-control form-select form-control-lg custom-select" name="classificacao" id="classificacao">
                            <option value="6">Livre</option>
                            <option value="10">10+</option>
                            <option value="12">12+</option>
                            <option value="14">14+</option>
                            <option value="16">16+</option>
                            <option value="18">18+</option>
                        </select>
                    </div>        
                    <div class="form-group col-md-6">
                        <label for="inputLancamento">Data de Lançamento:</label>
                        <input type="date" class="form-control form-control-lg" id="data-lancamento" placeholder="00/00/0000"/>
                    </div>                

                        <button class="btn btn-lg btn-secondary mt-4" onclick="cadastrarFilme()">Cadastrar</button>

                    </div>
                </div>

            </form>   
            
            <div class="mb-5 sm-flex p-5">
                <h1 class="titulo">Catálogo</h1>
                <p class="texto"> 
                <p> 
                    Esta é a sessão de filmes disponíveis para alugar!
                </p>
                
                <button class="btn btn-lg btn-secondary mt-4" onclick="listarFilmes()">Listar Filmes</button>
                <div class="my-5" id="lista-filmes"></div>
            </div>
            
        `;
    }
}
