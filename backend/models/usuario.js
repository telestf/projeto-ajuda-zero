class Usuario {
    constructor(id, email, nome) {
        this.id = id
        this.email = email
        this.nome = nome
    }
}

const listaUsuarios = []

listaUsuarios.push(new Usuario(1, "son.goku@dbz.com", "Son Goku"))
listaUsuarios.push(new Usuario(id=2, email="son.gohan@dbz.com", nome="Son Gohan"))
listaUsuarios.push(new Usuario(3, "bulma.briefs@dbz.com", "Bulma Briefs"))

module.exports = { Usuario, listaUsuarios }