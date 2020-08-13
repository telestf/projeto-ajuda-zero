const express = require('express')
const { Usuario, listaUsuarios } = require('../../models/usuario')
const { check, validationResult } = require('express-validator');
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

router.post('/', [
    check('email', 'email não é válido').isEmail(),
    check('nome', 'nome não é válido').isLength({min:3}).isAlpha(["pt-BR"])
], (req, res) => {
    
    try {
        let { email, nome } = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors : errors.array()})
        } else {
            let usuario = new Usuario(email=email, nome=nome)
            listaUsuarios.push(usuario)
            console.log(`${nome} ${email}`)
            res.send(listaUsuarios)
        }
    } catch(err) {
        res.status(500).send({"err" : "Server Error"})
    }
})

router.put('/:userId' , (req, res) => {
    try {
        let usuario = listaUsuarios.filter(user => user.id == req.params["userId"])
        if(usuario.length > 0){
            usuario = usuario[0]
            let {email, nome} = req.body
            if (!email){
                res.status(400).send({"err" : "Coé doido, esqueceu o email?"}) 
            } else if (!nome) { 
                res.status(400).send({"err" : "Coé doido, esqueceu o nome?"}) 
            } else {
                for (const [chave, valor] of Object.entries(req.body)){
                    usuario[chave] = valor
                }
            }
        } else {
            res.status(404).send({"err" : "Usuário não existe, pooo"})
        }
    } catch (err) {
        res.status(500).send({"err" : "Server Error"})        
    }
})

router.patch('/:userId' , (req, res) => {
    try {
        let usuario = listaUsuarios.filter(user => user.id == req.params["userId"])
        if(usuario.length > 0){
            usuario = usuario[0]
            let { email, nome } = req.body

            for (const [chave, valor] of Object.entries(req.body)){
                if (!valor){
                    continue
                }
                usuario[chave] = valor
            }
            res.send(usuario)
         } else {
             res.status(404).send({"err" : "Usuário não existe, pooo"})
         }    } catch (err) {
        res.status(500).send({"err" : "Server Error"})   
    }
})

router.delete('/:userId' , (req, res) => {
    try {
        let usuario = listaUsuarios.filter(user => user.id == req.params["userId"])
        if (usuario.length > 0) {
            listaUsuarios = listaUsuarios.filter(user => user.id != req.params["userId"])
            res.send(listaUsuarios)
        } else {
            res.status(404).send({"err" : "Usuário não existe, pooo"}) 
        }
    } catch (err) {
        res.status(500).send({"err" : "Server Error"})   
    }
})

module.exports = router