class Usuario {
    constructor(email, nome) {
        this.id = this.gerarId()
        this.email = email
        this.nome = nome
    }

    gerarId() {
        if (listaUsuarios.length === 0){
            return 1
        }
        return listaUsuarios[listaUsuarios.length-1].id +1
    }
}

const listaUsuarios = []

listaUsuarios.push(new Usuario("son.goku@dbz.com", "Son Goku"))
listaUsuarios.push(new Usuario(email="son.gohan@dbz.com", nome="Son Gohan"))
listaUsuarios.push(new Usuario("bulma.briefs@dbz.com", "Bulma Briefs"))

module.exports = { Usuario, listaUsuarios }

