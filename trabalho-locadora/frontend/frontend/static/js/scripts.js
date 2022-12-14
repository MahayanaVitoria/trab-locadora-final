function mask_cpf() {
    var cpf = document.getElementById('cpf')
    if (cpf.value.length == 3 || cpf.value.length == 7) {
        cpf.value += "."
    } else if (cpf.value.length == 11) {
        cpf.value += "-"
    }
}

function mask_phone() {
    var telefone = document.getElementById('telefone')
    if (telefone.value.length == 2) {
        telefone.value += " "
    } else if (telefone.value.length == 8) {
        telefone.value += "-"
    }
}

const userLocale =
navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language;

var formatReal = (valor) => {
    return valor.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})
}

var url = 'http://localhost:3000/'

//CADASTRO CLIENTE
function cadastrarCliente() 
{
    nome = document.getElementById('nome-completo').value
    cpf = document.getElementById('cpf').value.replaceAll('.', '').replace('-', '')
    telefone = document.getElementById('telefone').value
    nascimento = document.getElementById('data-nascimento').value

    //validacao do prenchimento de nome completo
    if(!validaNome('nome-completo'))
	{
		return
	}
	//validacao do preenchimento de data nascimento
	if(!validaNascimento('data-nascimento'))
	{
		return
	}
}

function cadastrarCliente() 
{
    nome = document.getElementById('nome-completo').value
    cpf = document.getElementById('cpf').value.replaceAll('.', '').replace('-', '')
    telefone = document.getElementById('telefone').value
    nascimento = document.getElementById('data-nascimento').value

    if (nascimento.length != 10) {
        return
    }

    let ano = parseInt(nascimento.substring(0, 4))

    let hoje = new Date().getFullYear()

    console.log(cpf)
    console.log(hoje)
    if ( ano < 1900 || ano > hoje)
    {
        alert("Ano de nascimento inválido")
        return 
    }
    
    let body =
    {
        "NomeCompleto": nome,
        "CPF": cpf,
        "telefone": telefone,
        "dataNascimento": nascimento
    }

    Post(body, "clientes")
}

//validação de nome completo
function validaNome(id){
    
    let inputNome = document.getElementById(id)
    if (inputNome.value.trim().split(' ').length >= 2)
    {
        inputNome.style.border = 0
        return true
    }
    else
    {
        inputNome.style.border = 'solid 1px red'
        return false
    }
}

//validação de cep e autocomplete de endereço
function validaCep(){
    fetch('https://viacep.com.br/ws/' + document.getElementById('cep').value + '/json')
    .then(response => response.json())
    .then((output) =>
    {
        document.getElementById('endereco').value = output.logradouro
    })
}

//CADASTRO FILME


function cadastrarFilme()
{
    let body = 
    {
        "Nome": document.getElementById('nome').value,
        "Genero": document.getElementById('genero').value,
        "Classificacao": parseInt(document.getElementById('classificacao').value),
        "DataLancamento": document.getElementById('data-lancamento').value
    }

    Post(body, "filmes")
}

async function Post(body, type)
{
    fetch(url + type,
    {
        'method': 'POST',
        'redirect': 'follow',
        'headers':
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        'body': JSON.stringify(body)
    })
    .then((response) => 
    {
        if(response.ok)
        {
            return response.text()
        }
        else
        {
            return response.text().then((text) =>
            {
                throw new Error(text)
            })
        }
    })
    .then((output) =>
    {
        console.log(output)
        alert('Cadastro efetuado :D')
    })
    .catch((error) =>
    {
        console.log(error)
        alert("Não foi possível efetuar o cadastro")
    })
}

async function Put(body, type)
{
    fetch(url + type, 
    {
        'method': 'PUT',
        'redirect': 'follow',
        "headers":
        {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        'body': JSON.stringify(body)
    })
    .then((response) => 
    {
        if(response.ok)
        {
            return response.text()
        }
        else
        {
            return response.text().then((text) =>
            {
                throw new Error(text)
            })
        }
    })
    .then((output) =>
    {
        console.log(output)
        alert('Edição feita com sucesso')
    })
    .catch((error) =>
    {
        console.log(error)
        alert("Não foi possível editar")
    })
}

const getClassificacao = (c) => {
    switch(c) {
        case 6:
            return "Livre"
        case 10:
            return "10+"
        case 12:
            return "12+"
        case 14:
            return "14+"
        case 16:
            return "16+"
        case 18:
            return "18+"
        default:
            return "Não Informado"
    }
}

function getIndexClass(c) {
    switch(c) {
        case 6:
            return 0
        case 10:
            return 1
        case 12:
            return 2
        case 14:
            return 3
        case 16:
            return 4
        case 18:
            return 5
    }
}

async function listarFilmes()
{

    let listaFilmes = document.getElementById('lista-filmes')

    let divFilme = document.createElement('div')
    divFilme.setAttribute('class', 'border border-dark rounded my-2 p-2 mx-2 bg-dark text-light')

    let divNome = document.createElement('p')
    divNome.innerHTML = "Nome: O Farol"
    divFilme.appendChild(divNome)

    let divGenero = document.createElement('p')
    divGenero.innerHTML = "Gênero: Suspense"
    divFilme.appendChild(divGenero)

    let divClassificacao = document.createElement('p')
    divClassificacao.innerHTML = "Classificação: +18"
    divFilme.appendChild(divClassificacao)

    let divDataLancamento = document.createElement('p')
    divDataLancamento.innerHTML = "Data de Lançamento: 19/09/2019"
    divFilme.appendChild(divDataLancamento)

    let divPreco = document.createElement('p')
    divPreco.innerHTML = "Preço: 18,90"
    divFilme.appendChild(divPreco)

    let buttonDiv = document.createElement('div')
    buttonDiv.setAttribute('class', 'd-flex flex-row-reverse')

    let buttonDelete = document.createElement('button')
    buttonDelete.setAttribute('class', 'btn btn-outline-danger ms-2')
    buttonDelete.innerHTML = "Excluir"
    buttonDiv.appendChild(buttonDelete)

    let buttonEdit = document.createElement('button')
    buttonEdit.setAttribute('class', 'btn btn-outline-warning')
    buttonEdit.innerHTML = "Editar"

    
    buttonDiv.appendChild(buttonEdit)

    divFilme.appendChild(buttonDiv)
    listaFilmes.appendChild(divFilme)



    fetch(url + 'filmes')
    .then(response => response.json())
    .then((filmes) => 
    {
        

        console.log(filmes)
        while(listaFilmes.firstChild)
            listaFilmes.removeChild(listaFilmes.firstChild)
        

        for(let filme of filmes)
        {

            console.log(filme)
            // Div com todas informações do item filme
            let divFilme = document.createElement('div')
            divFilme.setAttribute('class', 'border border-dark rounded my-2 p-2 mx-2 bg-dark text-light')

            let divNome = document.createElement('p')
            divNome.innerHTML = "Nome: " + filme.nome
            divFilme.appendChild(divNome)

            let divGenero = document.createElement('p')
            divGenero.innerHTML = "Gênero: " + filme.genero
            divFilme.appendChild(divGenero)

            let divClassificacao = document.createElement('p')
            divClassificacao.innerHTML = "Classificação: " + getClassificacao(filme.classificacao)
            divFilme.appendChild(divClassificacao)
     
            var data = new Date(filme.dataLancamento).toLocaleDateString(userLocale)
            let divDataLancamento = document.createElement('p')
            divDataLancamento.innerHTML = "Data de Lançamento: " + data
            divFilme.appendChild(divDataLancamento)

            let divPreco = document.createElement('p')
            divPreco.innerHTML = "Preço: " + formatReal(filme.preco)
            divFilme.appendChild(divPreco)

            let buttonDiv = document.createElement('div')
            buttonDiv.setAttribute('class', 'd-flex flex-row-reverse')

            let buttonDelete = document.createElement('button')
            buttonDelete.setAttribute('class', 'btn btn-outline-danger ms-2')
            buttonDelete.innerHTML = "Excluir"
            buttonDiv.appendChild(buttonDelete)

            buttonDelete.onclick = async () => {

                if(window.confirm("Tem certeza que deseja remover " + filme.nome + " ?"))
                {
                    await deletar("filmes/", filme.id)
                    
                }
                listarFilmes()
            }


            let buttonEdit = document.createElement('button')
            buttonEdit.setAttribute('class', 'btn btn-outline-warning')
            buttonEdit.innerHTML = "Editar"

            buttonEdit.onclick = () => {
                modoEditarFilme(filme.id)
            }


            buttonDiv.appendChild(buttonEdit)

            divFilme.appendChild(buttonDiv)
            listaFilmes.appendChild(divFilme)
        }
        
    })
}

async function listarClientes()
{

    let listaClientes = document.getElementById('lista-clientes')
    let divCliente = document.createElement('div')
    divCliente.setAttribute('class', 'border border-dark rounded my-2 p-2 mx-2 bg-dark text-light')

    let divNome = document.createElement('p')
    divNome.setAttribute('class', 'ms-2 mt-2')
    divNome.innerHTML = "Nome: Sergio Nogueira"
    divCliente.appendChild(divNome)

    let divTel = document.createElement('p')
    divTel.setAttribute('class', 'ms-2 mt-2')
    divTel.innerHTML = "Telefone: 41 99999-9999"
    divCliente.appendChild(divTel)

    let divButtons = document.createElement('div')
    divButtons.setAttribute('class', 'd-flex flex-row-reverse')

    let editButton = document.createElement('button')
    editButton.setAttribute('class', 'btn btn-outline-warning')
    editButton.innerHTML = "Editar"

    let deleteButton = document.createElement('button')
    deleteButton.setAttribute('class', 'btn btn-outline-danger ms-2')
    deleteButton.innerHTML = "Deletar"

    divButtons.appendChild(deleteButton)
    divButtons.appendChild(editButton)

    divCliente.appendChild(divButtons)

    listaClientes.appendChild(divCliente)

    fetch(url + 'clientes')
    .then(response => response.json())
    .then((clientes) =>
    {   

        let listaClientes = document.getElementById('lista-clientes')
        listaClientes.setAttribute('class', 'box p-2')

        while(listaClientes.firstChild)
        listaClientes.removeChild(listaClientes.firstChild)

        
        if (clientes.length < 1)
        {
            alert("Não há nenhum cliente na base de dados")
            return
        }

        for(let cliente of clientes)
        {  
            
            let divCliente = document.createElement('div')
            divCliente.setAttribute('class', 'border border-dark rounded my-2 p-2 mx-2 bg-dark text-light')

            let divNome = document.createElement('p')
            divNome.setAttribute('class', 'ms-2 mt-2')
            divNome.innerHTML = "Nome: " + cliente.nomeCompleto
            divCliente.appendChild(divNome)

            let divTel = document.createElement('p')
            divTel.setAttribute('class', 'ms-2 mt-2')
            divTel.innerHTML = "Telefone: " + cliente.telefone
            divCliente.appendChild(divTel)


            let divButtons = document.createElement('div')
            divButtons.setAttribute('class', 'd-flex flex-row-reverse')

            let editButton = document.createElement('button')
            editButton.setAttribute('class', 'btn btn-outline-warning')
            editButton.innerHTML = "Editar"
            editButton.onclick = () => {        
               modoEditarCliente(cliente.id)
            }


            let deleteButton = document.createElement('button')
            deleteButton.setAttribute('class', 'btn btn-outline-danger ms-2')
            deleteButton.innerHTML = "Deletar"

            deleteButton.onclick = async () => {

                if (window.confirm("Tem certeza que deseja remover " + cliente.nomeCompleto + " do sistema ?")) {
                    await deletar("clientes/",cliente.id)
                    
                }
                listarClientes()

            }
            divButtons.appendChild(deleteButton)
            divButtons.appendChild(editButton)

            divCliente.appendChild(divButtons)

            listaClientes.appendChild(divCliente)
        }
    })
}

async function listarAlugueis()
{
    let selectedClient = document.getElementById('select-clientes-2').value
    
    if (selectedClient == -1)
    {
        alert("Selecione o cliente que deseja verificar")
        return
    }  
    let aluguelList = document.getElementById('lista-alugueis')
    
    while(aluguelList.firstChild)
    {
        aluguelList.removeChild(aluguelList.firstChild)
    }
    
    alugueisDoCliente = await this.getAluguelByClient(selectedClient)
    let titleAlugueis = document.getElementById('title-aluguel')

    if (alugueisDoCliente.length < 1)
    {
        titleAlugueis.innerHTML = "Usuário não possui filmes alugados"
        return
    }


    titleAlugueis.innerHTML = "Filmes alugados:"

    for(var aluguel of alugueisDoCliente)
    {
        var filme = await this.getFilmeById(aluguel.filmeID)
        let itemBox  = document.createElement('div')
        itemBox.setAttribute('class', 'border p-2')

        let labelNome = document.createElement('p')
        labelNome.innerHTML = "Nome: " + filme.nome
        itemBox.appendChild(labelNome)
        
        let labelEstado = document.createElement('p')
        labelEstado.innerHTML = "Estado: " + getEstado(aluguel.estadoDevolução)
        itemBox.appendChild(labelEstado)
        

        let divBotoes = document.createElement('div')
        divBotoes.setAttribute('class', 'd-flex flex-row-reverse')

        let botaoDevolver = document.createElement('button')
        botaoDevolver.setAttribute('class', 'btn btn-warning')
        
        botaoDevolver.innerHTML = "Devolver"
        botaoDevolver.value = aluguel.id
        botaoDevolver.onclick = () => {
            if(window.confirm("Tem certeza que deseja devolver este filme ? ")) {
                devolverFilme(botaoDevolver.value)
            }
        }

        if(aluguel.estadoDevolução == 1) {
            botaoDevolver.disabled = true
        }

        divBotoes.append(botaoDevolver)

        itemBox.append(divBotoes)

        aluguelList.appendChild(itemBox)
    }

}

async function deletar(type, id)
{      
    fetch(url + type + id,
    {
        'method': 'DELETE',
        'redirect': 'follow'
    })
    .then((response) => 
    {
        if(response.ok)
        {
            return response.text()
        }
        else
        {
            return response.text().then((text) =>
            {
                throw new Error(text)
            })
        }
    })
    .then((output) => 
    {
        // listarClientes()
        console.log(output)
        alert('Deletado com sucesso')
    })
    .catch((error) =>
    {
        console.log(error)
        alert('Não foi possível remover')
    })
}

function criarAluguel()
{
    let idCliente = document.getElementById('select-clientes').value
    let idFilme = document.getElementById('select-filmes').value

    if (idCliente == -1) {
        alert("Por favor, selecione um cliente")
        return
    }

    if (idFilme == -1) {
        alert("Por favor, selecione um filme")
        return
    }

    let body =
    {
        "ClienteID": idCliente,
        "FilmeID": idFilme
    }

    Post(body, "alugueis")
}

async function getFilmeById(id)
{
    const req = await fetch(url + 'filmes/' + id)
    const res = await req.json()
    return res
}

async function getAluguelByClient(id)
{
    const req = await fetch(url + 'alugueis/cliente/' + id)
    const res = await req.json()
    return res
}

async function getClientById(id)
{
    const req = await fetch(url + 'clientes/' + id)
    const res = await req.json()
    return res
}

function getEstado(en)
{
    console.log(en)
    switch(en)
    {
        case 0:
            return "Pendente"
        case 1:
            return "Devolvido"
        case 2:
            return "Atrasado"
        default:
            return "Indefinido"
    }
}

function devolverFilme(id)
{
    fetch(url + "alugueis/devolver/" + id,
    {
        'method': 'PUT',
        'redirect': "follow"
    })
    .then((response) => 
    {
        if(response.ok)
        {
            return response.text()
        }
        else
        {
            return response.text().then((text) =>
            {
                throw new Error(text)
            })
        }
    })
    .then((output) => 
    {
        listarAlugueis()
        console.log(output)
        alert('Filme Devolvido')
    })
    .catch((error) =>
    {
        console.log(error)
        alert('Não foi possível devolver o filme')
    })
    
    
}

async function modoEditarCliente(id)
{
    let title = document.getElementById('title-cad-cliente')
    title.innerHTML = "Edição de Cliente"

    let formCliente = document.getElementById('cliente-form')

    formCliente.removeChild(formCliente.lastChild)


    document.getElementById('lista-dos-clientes').setAttribute('class', 'escondido')


    let buttonEdit = document.createElement('button')
    buttonEdit.setAttribute('class', 'btn btn-warning')
    buttonEdit.innerHTML = "Salvar Alterações"
    buttonEdit.onclick = () => {
        let nome = document.getElementById('nome-completo').value
        let cpf = document.getElementById('cpf').value.replaceAll('.', '').replace('-', '')
        let telefone = document.getElementById('telefone').value
        let nascimento = document.getElementById('data-nascimento').value
    
        if (nascimento.length != 10) {
            return
        }
    
        let ano = parseInt(nascimento.substring(0, 4))
    
        let hoje = new Date().getFullYear()
    
        console.log(cpf)
        console.log(hoje)
        if ( ano < 1900 || ano > hoje)
        {
            alert("Ano de nascimento inválido")
            return 
        }
    
        let body =
        {
            "NomeCompleto": nome,
            "CPF": cpf,
            "telefone": telefone,
            "dataNascimento": nascimento
        }
        this.Put(body, 'clientes/' + id)
    }


    let buttonCancelEdit = document.createElement('button')
    buttonCancelEdit.setAttribute('class', 'btn btn-danger')
    buttonCancelEdit.innerHTML = "Cancelar"

    buttonCancelEdit.onclick = modoCadastroCliente

    formCliente.appendChild(buttonEdit)
    formCliente.appendChild(buttonCancelEdit)


    let clienteSelecionado = await this.getClientById(id)

    document.getElementById('nome-completo').value = clienteSelecionado.nomeCompleto
    document.getElementById('cpf').value = clienteSelecionado.cpf
    document.getElementById('telefone').value = clienteSelecionado.telefone
    document.getElementById('data-nascimento').value = clienteSelecionado.dataNascimento.substring(0, 10)
}

async function modoCadastroCliente()
{
    let title = document.getElementById('title-cad-cliente')
    title.innerHTML = "Cadastro de Clientes"

    let formCliente = document.getElementById('cliente-form')
    formCliente.removeChild(formCliente.lastChild)
    formCliente.removeChild(formCliente.lastChild)

    let buttonCadastro = document.createElement('button')
    buttonCadastro.setAttribute('class', 'btn btn-success')
    buttonCadastro.onclick = this.cadastrarCliente
    buttonCadastro.innerHTML = "Cadastrar"

    document.getElementById('nome-completo').value = ""
    document.getElementById('cpf').value = ""
    document.getElementById('telefone').value = ""
    document.getElementById('data-nascimento').value = ""

    document.getElementById('lista-dos-clientes').setAttribute('class', '')
    formCliente.appendChild(buttonCadastro)

    let listaClientes = document.getElementById('lista-clientes')
    while(listaClientes.firstChild)
        listaClientes.removeChild(listaClientes.firstChild)
}


function menuShow(){
    if(document.querySelector('#menu').classList.contains('open')){
        document.querySelector('#menu').classList.remove('open')
    } else {
        document.querySelector('#menu').classList.add('open')
    }
}

async function modoEditarFilme(id)
{
    document.getElementById('title-cad-filme').innerHTML = "Edição de Filme"

    let formFilme = document.getElementById('form-filme')
    formFilme.removeChild(formFilme.lastElementChild)

    document.getElementById('catalogo').setAttribute('class', 'escondido')

    let buttonEdit = document.createElement('button')
    buttonEdit.setAttribute('class', 'btn btn-warning')
    buttonEdit.innerHTML = "Salvar Alterações"

    buttonEdit.onclick = () => {

        let body = 
        {
            "Nome": document.getElementById('nome').value,
            "Genero": document.getElementById('genero').value,
            "Classificacao": parseInt(document.getElementById('classificacao').value),
            "DataLancamento": document.getElementById('data-lancamento').value
        }

        this.Put(body, "filmes/" + id)

        modoCadastroFilme()
    }



    let buttonCancelEdit = document.createElement('button')
    buttonCancelEdit.setAttribute('class', 'btn btn-danger')
    buttonCancelEdit.innerHTML = "Cancelar"

    buttonCancelEdit.onclick = modoCadastroFilme

    formFilme.appendChild(buttonEdit)
    formFilme.appendChild(buttonCancelEdit)

    let filmeSelecionado = await this.getFilmeById(id)

    document.getElementById('nome').value = filmeSelecionado.nome
    document.getElementById('genero').value = filmeSelecionado.genero
    document.getElementById('classificacao').selectedIndex = getIndexClass(filmeSelecionado.classificacao)
    document.getElementById('data-lancamento').value = filmeSelecionado.dataLancamento.substring(0, 10)

}

async function modoCadastroFilme()
{
    document.getElementById('title-cad-filme').innerHTML = "Cadastro de Filmes"

    let formFilme = document.getElementById('form-filme')
    formFilme.removeChild(formFilme.lastChild)
    formFilme.removeChild(formFilme.lastChild)

    let buttonCadastro = document.createElement('button')
    buttonCadastro.setAttribute('class', 'btn btn-success')
    buttonCadastro.onclick = this.cadastrarFilme
    buttonCadastro.innerHTML = "Cadastrar"

    document.getElementById('nome').value = ""
    document.getElementById('genero').value = ""
    document.getElementById('classificacao').selectedIndex = 0
    document.getElementById('data-lancamento').value = "" 

    document.getElementById('catalogo').setAttribute('class', '')
    formFilme.appendChild(buttonCadastro)

    let listFilmes = document.getElementById('lista-filmes')
    while(listFilmes.firstChild)
        listFilmes.removeChild(listFilmes.firstChild)

}