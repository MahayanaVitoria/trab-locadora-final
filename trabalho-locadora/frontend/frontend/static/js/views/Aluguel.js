import AbstractView from "./AbstractView";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Alugueis");
    }

    async getHtml() {
        return `
            <form class="form mb-5 sm-flex p-5">
                <h1 class="titulo mb-4">Alugar Filme</h1>
                <div class="mb-5 border rounded p-2">
                    <h3 class="texto">Novo Aluguel</h1>

                    <div id="form-aluguel" class="form d-flex bd-highlight">
                        
                        <select class="form-select-lg col-6" id="select-clientes">
                            <option value="-1">Selecione o Cliente</options>                        
                        </select>
                    
                        <select class="form-select-lg col-6" id="select-filmes">
                            <option value="-1">Selecione o Filme</option>                        
                        </select>

                    </div>

                    <div class="d-flex flex-row-reverse mt-2">
                        <button onclick="criarAluguel()" class="btn btn-secondary">Alugar</button>
                    </div>
                </div>

                                    
                <div class="mb-5 border rounded p-2">
                    <h3 class="texto">Lista de Alugueis</h3>
                    
                    <div id="form-aluguel" class="form d-flex bd-highlight">
                        <select class="form-select-lg col-12" id="select-clientes-2" aria-label=".form-select-lg example">
                            <option value="-1">Selecione o Cliente</option>
                        </select>

                        <h3 id="title-aluguel"></h3>
                        <div id="lista-alugueis">
                        
                        </div>
                    </div>  

                    <div class="d-flex flex-row-reverse mt-2">
                        <button onclick="listarAlugueis()" class="btn btn-secondary">Buscar</button>
                    </div> 

                </div>
            
            </form>
                    
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