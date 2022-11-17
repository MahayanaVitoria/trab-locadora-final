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
                <div class="form">

                <div class="form-row form" id="filme-form">

                    <div class="form-group col-md-6">
                        <label for="inputFilme">Nome do Filme:</label>
                        <input type="text" class="form-control form-control-lg" id="nome" placeholder="Senhor dos Anéis" required autocomplete="off"/>
                    </div>
                    
                    <div class="form-group col-md-6">
                        <label for="inputGenero">Gênero:</label>
                        <input type="text" class="form-control form-control-lg" id="genero" placeholder="Ficção"/>
                    </div>

                    <div class="form-group col-md-6" name="classificacao" id="classificacao">
                        <label for="selectIndicacao">Classificação Indicativa:</label>
                        <select class="form-select form-select-lg">
                            <option value="6">Livre</option>
                            <option value="10">10 anos</option>
                            <option value="12">12 anos</option>
                            <option value="14">14 anos</option>
                            <option value="16">16 anos</option>
                            <option value="18">18 anos</option>
                        </select>
                    </div>

                    <div class="form-group col-md-6">
                        <label for="inputLancamento">Data de Lançamento:</label>
                        <input type="date" class="form-control form-control-lg" id="data-lancamento">
                    </div>
                              
                    <button class="btn btn-lg btn-secondary mt-4" onclick="cadastrarFilme()">Cadastrar</button>
                
                </div>    
            </form>
            
            <div class="mt-5">
                <h1 class="titulo">Catálogo</h1>
                <p class="texto"> 
                <p> 

                    Esta é a sessão de filmes disponíveis para alugar!
                </p>
                
                <button class="btn btn-lg btn-secondary mt-4" onclick="listarFilmes()">Listar Filmes</button>
                <div id="lista-filmes"></div>
            </div>  
        `;
    }
}
