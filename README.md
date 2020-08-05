# Resumão

## 1 - Início do projeto e instalação das dependências

`npm init`
`npm install express`
`npm install nodemon`

## 2 - Criar o JS

`server.js`

~~~Javascript
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
~~~

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

-[] Criar pasta `routes`
-[] Criar pasta `api` dentro de `routes`
-[] Mover o código do `server.js`para dentro de `usuario.js`
-[] Atualizar código do `server.js`

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

-[] Criar pasta `models`
-[] Criar `usuario.js` dentro da pasta `models`

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

-[] Importar a lista no `usuario.js` dentro de `routes/api` e atualizar o método GET

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
            res.status(400).res.send({"erro" : "Cadê o email?"})
        } else if (!nome){
            res.status(400).res.send({"erro" : "Cadê o nome?"})
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
