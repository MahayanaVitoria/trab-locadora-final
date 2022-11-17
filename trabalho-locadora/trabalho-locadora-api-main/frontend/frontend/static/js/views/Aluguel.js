import AbstractView from "./AbstractView";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Alugueis");
    }

    async getHtml() {
        return `
            <div>
                <h1 class="titulo">Aluguel de Filmes</h1>
                <div class="mb-5 id="form-aluguel"">
                    <h3 class="texto"> Novo Aluguel </h3>

                    <div class="form-group col-md-6" name="aluguel-cliente" >
                        <label for="selectCliente">Cliente:</label>
                        <select class="form-select form-select-lg" id="select-clientes">
                            <option value="-1">Selecione o cliente</options>
                        </select>
                    </div>
                    

                    <div class="form-group col-md-6" name="aluguel-filme">
                    <label for="selectFilme">Filme:</label>
                        <select class="form-select form-select-lg" id="select-filmes">
                            <option value="-1">Selecione o filme</option>                        
                        </select>
                    </div>

                    <button class="btn btn-lg btn-secondary mt-4" onclick="criarAluguel()">Alugar</button>
                    
                </div>

                                    
                <div class="mb-5 pb-5">
                    <h3 class="texto">Listar Aluguéis</h3>
                    
                    <div class="form form-group col-md-6">
                        <select class="form-select form-select-lg mb-3" id="select-clientes-2" aria-label=".form-select-lg example">
                            <option value="-1">Selecione o Cliente</option>
                        </select>

                        <button onclick="listarAlugueis()" class="btn btn-lg btn-secondary mt-2">Listar</button>
                        
                        <h3 id="title-aluguel"></h3>
                        <div id="lista-alugueis">

                    </div>      
                </div>
                    
            `;
    }

    async onRender() {
        this.getClientes("select-clientes")
        this.getClientes("select-clientes-2")
        this.getFilmes()
    }

    getClientes(id) {
        fetch("http://localhost:3000/clientes")
        .then(response => response.json())
        .then((clientes) =>
        {
            let selectCliente = document.getElementById(id)

            for(let c of clientes)
            {
                let opt = document.createElement('option')
                opt.text = c.nomeCompleto
                opt.value = c.id

                selectCliente.add(opt)
            }
        })
    }

    getFilmes() {
        fetch("http://localhost:3000/filmes/disponiveis")
        .then(response => response.json())
        .then((filmes) =>
        {
            let selectFilme = document.getElementById('select-filmes')

            for(let f of filmes)
            {
                let opt = document.createElement('option')
                opt.text = f.nome
                opt.value = f.id

                selectFilme.add(opt)
            }
        })
    }


}
                    // <select class="form-select" id="select-clientes">
                    //     <option value="-1">Cliente</options>                        
                    // </select>
                    
                    // <select class="form-select" id="select-filmes">
                    //     <option value="-1">Filme</options>                        
                    // </select>