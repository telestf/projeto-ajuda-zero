const express = require('express')
const listaUsuarios = require('../../models/usuario')
const router = express.Router()

router.get('/', (req, res) => {
    try {
        res.send(listaUsuarios)
    } catch (err) {
        res.status(500).send({"err" : "Server Error"})
    }
})

router.get('/:userId' , (req, res) => {
    
    try {
        let usuario = listaUsuarios.filter(u => u.id == req.params["userId"])
        if (usuario.length > 0) {
            res.send(usuario[0])
        } else {
            res.status(404).send({"err" : "Usuário não existe, pooo"})
        }
    } catch(err) {
        res.status(500).send({"err" : "Server Error"})
    }
})

router.post('/', (req, res) => {
    
    try {
        let usuario = {id: 0}
        let {email, nome} = req.body
        usuario.email = email
        usuario.nome = nome
    
        if (!email){
            res.status(400).res.send({"err" : "Coé doido, esqueceu o email?"}) 
        } else if (!nome) { 
            res.status(400).res.send({"err" : "Coé doido, esqueceu o nome?"}) 
        } else {
            usuario.id = listaUsuarios[listaUsuarios.length-1].id +1
            listaUsuarios.push(usuario)
            console.log(`${nome} ${email}`)
            res.send(listaUsuarios)
        }
    } catch(err) {
        res.status(500).send({"err" : "Server Error"})
    }
})

module.exports = router