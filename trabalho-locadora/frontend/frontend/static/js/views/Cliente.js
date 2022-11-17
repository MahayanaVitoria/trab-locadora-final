import AbstractView from "./AbstractView";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Cadastro de Clientes");
    }

    async getHtml() {
        return `
        
            <form class="form mb-5 sm-flex p-5">
                <h1 class="titulo">Cadastro de Clientes</h1>
                <div class="form">
                
                    <div class="form-row form" id="cliente-form">
                        <div class="form-group col-md-6">
                            <label for="inputNome">Nome Completo:</label>
                            <input type="text" class="form-control form-control-lg" id="nome-completo" placeholder="Nome Completo" required onblur="validaNome(this.id)"/>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputCpf">CPF:</label>
                            <input type="text" class="form-control form-control-lg" id="cpf" placeholder="000.000.000-00" autocomplete="off" maxlength="14" onkeypress="mask_cpf()"/>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputNascimento">Data de Nascimento:</label>
                            <input type="date" class="form-control form-control-lg" id="data-nascimento" placeholder="00/00/0000" onblur="validaNasc(this.id)" required/>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputTel">Telefone:</label>
                            <input type="phone" class="form-control form-control-lg" id="telefone" placeholder="41 99999-9999"autocomplete="off" maxlength="13" onkeypress="mask_phone()"/>
                        </div>
                    </div>

                    <button onclick="cadastrarCliente()" class="btn btn-lg btn-secondary mt-4">Cadastrar</button>
                </div>
            </form>

            
            <div class="mb-5 sm-flex p-5" id="lista-dos-clientes">
                <h1 class="titulo">Lista de Clientes</h1>
                <p class="texto"> 
                <p> 
                    Essa é a sessão de clientes cadastrados!
                </p>

                <button onclick="listarClientes()" class="btn btn-lg btn-secondary mt-4">Listar Clientes </button>
                <div class="my-5" id="lista-clientes"></div>                
            
            </div>
            

        `;
        
    }
}
