# Resumão

> _Início da primeira aula_

## 1.a - Início do projeto e instalação das dependências (começando do zero)

`npm init -y`

`npm install express`

`npm install nodemon -D`

`npm install express-validator`

## 1.b - Início do projeto e instalação das dependências (fazendo clone/fork do repositório)

`npm install`

## 2 - Criar o JS

`server.js`

```JavaScript
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3001

app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/', (req, res) =>{
    res.send("msg" : "Olá! Testando app")
})

app.listen(PORT, () => {console.log(`App rodando na porta ${PORT}`)})
```

## 3 - Criar o HTML

`index.html`

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

</body>
</html>
```

## 4 - Criar formulário

`index.html`

```HTML
<form>
    <div class="form-group">
        <label for="email">E-mail:</label>
        <input type="text" name="email" id="email" placeholder="Insira um email para contato">
    </div>
    <div class="form-group">
        <label for="nome">Nome:</label>
        <input type="text" name="nome" id="nome" placeholder="Insira seu nome">
    </div>
    <div class="form-group">
        <button type="submit" id="submit">Enviar</button>
    </div>
</form>
```

## 5 - Criar métodos GET e POST do formulário

`server.js`

```Javascript
app.get('/form', (req, res) =>{
    res.send({"msg": "Olá! Este é o GET /form"})
})


app.post('/form', (req, res, next)=> {
    const {nome, email} = req.body
    if (!email){
        res.send({"err" : "cadê o email, doidão?"})
    }
    else{
        console.log(`${nome}, ${email}`)
        res.send(req.body)
    }
})
```

## 6 - Integrar BACK e FRONT

`index.html`

```HTML
<form method="POST" action="http://localhost:3001/usuario>
```

## 7 - Criar rotas

* Criar pasta `routes`
* Criar pasta `api` dentro de `routes`
* Mover o código do `server.js`para dentro de `usuario.js`
* Atualizar código do `server.js`

`server.js`

```Javascript
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 3001


app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


app.use('/', require('./routes/oi'))
app.use('/usuario', require('./routes/api/usuario'))

app.listen(PORT, () => {console.log(`App rodando na porta ${PORT}`)})
```

## 8 - Atualizar métodos

`oi.js`

```Javascript
const express = require('express')
const router = express.Router()


router.get('/', (req, res) =>{
    res.send('Olá! Testando app')
})


module.exports = router
```

`usuario.js`

```Javascript
const express = require('express')
const router = express.Router()


router.get('/', (req, res) =>{
    res.send({"msg": "Olá! Este é o GET /form"})
})


router.post('/', (req, res, next)=> {
    const {nome, email} = req.body
    if (!email){
        res.send({"err" : "cadê o email, doidão?"})
    }
    else{
        console.log(`Você digitou: ${nome}, ${email}`)
        res.send(req.body)
    }
})


module.exports = router
```

## 9 - Criar lista de usuarios

* Criar pasta `models`
* Criar `usuario.js` dentro da pasta `models`

`usuario.js`

```Javascript
const listaUsuarios = [
    {
        id: 1,
        email: "son.goku@dbz.com",
        nome: "Son Goku"
    },
    {
        id: 2,
        email: "son.gohan@dbz.com",
        nome: "Son Gohan"
    },
    {
        id: 3,
        email: "bulma.briefs@dbz.com",
        nome: "Bulma Briefs"
    }
]

module.exports = listaUsuarios;
```

## 10 - Utilizar a lista na API

* Importar a lista no `usuario.js` dentro de `routes/api` e atualizar o método GET

`usuario.js`

```Javascript
const listaUsuarios = require('../../models/user')


router.get('/', (req, res, next) => {
    try{
        res.send(listaUsuarios)
    } catch(err) {
        console.error(err.message)
        res.status(500).send({"error" : "Server Error"})
    }
})
```

## 11 - Atualizar o método POST

`usuario.js`

```Javascript
router.post('/', (req, res, next) => {
    try{
        const usuario = {id: 0}
        const {email, nome} = req.body
        usuario.email = email
        usuario.nome = nome

        if (!email){
            res.status(400).send({"erro" : "Cadê o email?"})
        } else if (!nome){
            res.status(400).send({"erro" : "Cadê o nome?"})
        } else  {
            usuario.id = listaUsuarios[listaUsuarios.length-1].id + 1
            listaUsuarios.push(usuario)
            console.log("Funcionou")
            res.send(listaUsuarios)
        }
    } catch(err) {
        console.error(err.message)
        res.status(500).send({"error" : "Server Error"})
    }
})
```

## 12 - Criar método de pegar um usuário em específico

`usuario.js`

```Javascript
router.get('/:userId', (req, res, next)=> {
    try{
      let usuario =  listaUsuarios.filter(u => u.id == req.params["userId"])
      if (usuario.length > 0){
        res.send(usuario[0])
      }else{
        res.status(404).send({"error" : "User not exist"})
      }
    }catch(err){
      console.error(err.message)
      res.status(500).send({"error" : "Server Error"})
    }
})
```

> _Fim da primeira aula_
>
> _Início da segunda aula_

## 13 - Criar a classe de usuários

`models/usuario.js`

```Javascript
class Usuario {
    constructor(id, email, nome){
        this.id = id
        this.email = email
        this.nome = nome
    }
}

let listaUsuario = []

listaUsuario.push(new Usuario(1, "son.goku@dbz.com", "Son Goku"))
listaUsuario.push(new Usuario(2, "son.gohan@dbz.com", "Son Gohan"))
listaUsuario.push(new Usuario(3, "bulma.briefs@dbz.com", "Bulma Briefs"))

module.exports = listaUsuario;
```

## 14 - Usar uma instância de classe para dar POST

* Exportar a classe Usuário

`models/usuario.js`

```Javascript
module.exports = { Usuario, listaUsuarios }
```

* Importar a classe

`routes/api/usuario.js`

```Javascript
var { Usuario, listaUsuarios } = require('../../models/user')
```

* Atualizar o método POST

`routes/api/usuario.js`

```Javascript
router.post('/', [], (req, res) => {  
    try {
        let {email, nome} = req.body
        let usuario = new Usuario(id=0, email=email, nome=nome)

        if (!email){
            res.status(400).send({"err" : "Coé doido, esqueceu o email?"})
        } else if (!nome) {
            res.status(400).send({"err" : "Coé doido, esqueceu o nome?"})
        } else {
            usuario.id = listaUsuarios[listaUsuarios.length-1].id +1
            listaUsuarios.push(usuario)
            console.log(`Tá rodando! Você inseriu: ${nome} ${email}`)
            res.send(listaUsuarios)
        }
    } catch(err) {
        res.status(500).send({"err" : "Server Error"})
    }
})
```

## 15 - Método PUT

`routes/api/usuario.js`

```Javascript
router.put('/:userId' , (req, res) => {
    try {
        let usuario = listaUsuarios.filter(u => u.id == req.params["userId"])
        if (usuario.length > 0) {
            usuario = usuario[0]
            let {email, nome} = req.body
            usuario.email = email
            usuario.nome = nome
            res.send(usuario)
        } else {
            res.status(404).send({"err" : "Usuário não existe, pooo"})
        }
    } catch(err) {
        res.status(500).send({"err" : "Server Error"})
    }
})
```

## 16 - Método PATCH

`routes/api/usuario.js`

```Javascript
router.patch('/:userId', (req, res, next)=> {
    try{
        let usuario =  listaUsuarios.filter(u => u.id == req.params["userId"])
        if (usuario.length > 0){
            usuario = usuario[0]
            let {email, nome} = req.body
            if (email) {
                usuario.email = email
            }
            if (nome) {
                usuario.nome = nome
            }
            res.send(usuario)
        } else {
            res.status(404).send({"error" : "User not exist"})
        }
    } catch(err){
        console.error(err.message)
        res.status(500).send({"error" : "Server Error"})
    }
})
```

## 17 - Método DELETE

`routes/api/usuario.js`

```Javascript
router.delete('/:userId', (req, res, next)=> {
    try{
      let usuario = listaUsuarios.filter(u => u.id == req.params["userId"])
      if (usuario.length > 0){
        listaUsuarios =  listaUsuarios.filter(u => u.id != req.params["userId"])
        res.send(listaUsuarios)
      }else{
        res.status(404).send({"error" : "User not exist"})
      }
    }catch(err){
      console.error(err.message)
      res.status(500).send({"error" : "Server Error"})
    }
})
```

## 18 - Métodos de Classe

* Atualizar o modelo

`models/usuario.js`

```Javascript
class Usuario {
    constructor(email, nome){
        this.id = this.gerarId()
        this.email = email
        this.nome = nome
    }

    gerarId() {
        if (lista_usuarios.length === 0){
            return 1
        }
        return lista_usuarios[lista_usuarios.length-1].id + 1
}

let listaUsuario = []

listaUsuario.push(new Usuario("son.goku@dbz.com", "Son Goku"))
listaUsuario.push(new Usuario("son.gohan@dbz.com", "Son Gohan"))
listaUsuario.push(new Usuario("bulma.briefs@dbz.com", "Bulma Briefs"))

module.exports = { Usuario, listaUsuario };
```

* Atualizar os métodos na API

`routes/api/usuario.js`

* POST

```Javascript
router.post('/', [], (req, res) => {  
    try {
        let {email, nome} = req.body

        if (!email){
            res.status(400).send({"err" : "Coé doido, esqueceu o email?"})
        } else if (!nome) {
            res.status(400).send({"err" : "Coé doido, esqueceu o nome?"})
        } else {
            let usuario = new Usuario(email=email, nome=nome)
            listaUsuarios.push(usuario)
            console.log(`Tá rodando! Você inseriu: ${nome} ${email}`)
            res.send(listaUsuarios)
        }
    } catch(err) {
        res.status(500).send({"err" : "Server Error"})
    }
})
```

* PUT

```Javascript
router.put('/:userId' , (req, res) => {
    try {
        let usuario = listaUsuarios.filter(u => u.id == req.params["userId"])
        if (usuario.length > 0) {
            usuario = usuario[0]
            let {email, nome} = req.body
            if (!email){
                res.status(400).send({"err" : "Coé doido, esqueceu o email?"})
            } else if (!nome) {
                res.status(400).send({"err" : "Coé doido, esqueceu o nome?"})
            } else {
                usuario.email = email
                usuario.nome = nome
                res.send(usuario)
            }
        } else {
            res.status(404).send({"err" : "Usuário não existe, pooo"})
        }
    } catch(err) {
        res.status(500).send({"err" : "Server Error"})
    }
})
```

## 19 - Object.entries

`routes/api/usuario.js`

* PATCH

```Javascript
router.patch('/:userId', (req, res, next)=> {
    try{
        let usuario =  listaUsuarios.filter(u => u.id == req.params["userId"])
        if (usuario.length > 0){
            usuario = usuario[0]
            let {email, nome} = req.body
            for (const [chave, valor] of Object.entries(req.body)) {
                if (!valor) {
                    continue
                }
                usuario[chave] = valor
            }
            res.send(usuario)
        } else {
            res.status(404).send({"error" : "User not exist"})
        }
    } catch(err){
        console.error(err.message)
        res.status(500).send({"error" : "Server Error"})
    }
})
```

* PUT

```Javascript
router.put('/:userId' , (req, res) => {
    try {
        let usuario = listaUsuarios.filter(u => u.id == req.params["userId"])
        if (usuario.length > 0) {
            usuario = usuario[0]
            let {email, nome} = req.body
            if (!email){
                res.status(400).send({"err" : "Coé doido, esqueceu o email?"})
            } else if (!nome) {
                res.status(400).send({"err" : "Coé doido, esqueceu o nome?"})
            } else {
                for (const [chave, valor] of Object.entries(req.body)) {
                    usuario[chave] = valor
                }
                res.send(usuario)
            }
        } else {
            res.status(404).send({"err" : "Usuário não existe, pooo"})
        }
    } catch(err) {
        res.status(500).send({"err" : "Server Error"})
    }
})
```

## 20 - express-validator

`routes/api/usuario.js`

* POST

```Javascript
router.post('/', [
        check('email', 'email não é válido').isEmail(),
        check('nome', 'nome não é válido').isLenght({min : 3}).isAlpha(['pt-BR'])
], (req, res) => {  
    try {
        let {email, nome} = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() })
        } else {
            let usuario = new Usuario(email=email, nome=nome)
            listaUsuarios.push(usuario)
            res.send(listaUsuarios)

    } catch(err) {
        res.status(500).send({"err" : "Server Error"})
    }
})
```

* PUT

```Javascript
router.put('/', [
        check('email', 'email não é válido').isEmail(),
        check('nome', 'nome não é válido').isLenght({min : 3}).isAlpha(['pt-BR'])
], (req, res) => {
    try {
        let usuario =  listaUsuarios.filter(u => u.id == req.params["userId"])
        if (usuario.length > 0) {
            usuario = usuario[0]
            for (const [chave, valor] of Object.entries(req.body)){
                usuario[chave] = valor
            }
            res.send(usuario)
        } else {
            res.status(404).send({"error" : "User not exist"})
        }
    } catch(err) {
        res.status(500).send({"error" : "Server Error"})
    }
})
```

> _Fim da segunda aula_
