const url = "https://api.github.com/users"
const client_id= "bf48b7f2988134b8f221"
const client_secret= "78fe35044b5e20821f5006346d28419828ec21e1"


class Model{
    constructor(){
        this._name = "";
        this._username = "";
        this._image = "";
        this._bio = "";
        this._repos = "";
    }

    buscarUsuario(user){
        let request = new XMLHttpRequest()

        request.addEventListener('load', () =>{
            if(request.status == 200){
                let dados = JSON.parse(request.responseText)
                this._Mostra(dados)
            }
            else
            {
                alert("Falha na requisição, verifique usuário!")
            }
        })
        
        request.open('GET', `${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`, false)

        request.send();
    }

    buscaRepositorios(user){
        let request = new XMLHttpRequest;
        request.addEventListener('load', () =>{
            if(request.status == 200){
                let dadosRepos = JSON.parse(request.responseText)
                this._repos = dadosRepos
            }else{
                alert("Falha ao acessar os repos")
            }
    })
    request.open('GET', `${url}/${user}/repos?client_id=${client_id}&client_secret=${client_secret}`, false)

    request.send()
}

    _Mostra(dados){
        this._name = dados.name;
        this._username = dados.login;
        this._image = dados.avatar_url;
        this._bio = dados.bio;
    }

    getName(){
        return this._name;
    }

    getUsername(){
        return this._username;
    }

    getImage(){
        return this._image;
    }

    getBio(){
        return this._bio;
    }
}

class View{
    Perfil(dados){
        let name = document.getElementById("nome")
        name.innerHTML = `Nome: ${dados.getName()}`
        
        let username = document.getElementById("username")
        username.innerHTML = `User: ${dados.getUsername()}`

        let image = document.getElementById("image")
        image.src = dados.getImage()
        
        let bio = document.getElementById("bio")
        bio.innerHTML = `Biografia: ${dados.getBio()}`
        
        let tituloDoRepositorio = document.getElementById("titulo-repositorios")
        tituloDoRepositorio.innerHTML = `Repositórios do usuário:`
    }

    Repositorios(dados){
    
        let repos = dados._repos

        for(let repo of repos){

        let repoNomeDiv = document.getElementById("nomeRepositorio")    
        let repoNomeParagrafo = `<a class="link" href="${repo.html_url}" target="_blank">${repo.name}</a></br></br><p class="language">Linguagem: ${repo.language}</br></br></p>`
        repoNomeDiv.innerHTML += repoNomeParagrafo
        }
    }
}

class Controller{
    Usuario(user){
        let modelUsuario = new Model
        modelUsuario.buscarUsuario(user)

        let viewUsuario = new View
        viewUsuario.Perfil(modelUsuario)
    }

    Repo(user){
        let modelRepositorio = new Model
        modelRepositorio.buscaRepositorios(user)

        let viewRepositorio = new View
        viewRepositorio.Repositorios(modelRepositorio)
    }
}

let button = document.getElementById("pesquisar")
let controller = new Controller

button.addEventListener("click", () =>{
    let input = document.getElementById("usuario").value
    controller.Repo(input)
    controller.Usuario(input)
})

