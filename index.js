const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const urlEncodedParser = bodyParser.urlencoded({ extended: false })
//const passport = require('passport’)
//const JwtStrategy = require('passport-jwt').Strategy

const secret = 'testsecret'
const app = express()


var users = [
    {password: 'admin', email: 'admin@hotmail.fr'}
]

var events = [
    {nom: 'Réunion Projet Symfony',description:'Réunion Symfony avec l\'équipe pour une mise au point' , dateDeb:'12/08/2019 12:00', dateFin:'12/08/2019 14:00', user: 'admin@hotmail.fr'}
]



app.get('/public', (req, res) => {
    res.send('I am public folks!')
})

app.get('/events', (req, res) => {
    res.send('Retourne events du user connecté')
})

app.post('/signup', urlEncodedParser, (req,res)=>{
    var userpass = req.body.mdp
    var usermail = req.body.mail

    var user = users.find(function(user){
        return user.email === usermail
    })

    if(!user){
        users.push({email: usermail,password: userpass})
        res.send('Utilisateur ajouté')
    }
    else{
        res.status(401).json({error: 'Cet email est déjà utilisé'})
    }
})

app.post('/login', urlEncodedParser, (req, res) => {
    var userpass = req.body.mdp
    var usermail = req.body.mail


    var user = users.find(function(user){
        return user.email === usermail
    })

    if(user){
        if(user.password === userpass){
            var token = jwt.sign({password: userpass, email: usermail},secret)
            res.json({
                jwt: token
            })
        }
        else{
            res.status(401).json({error: 'Mot de passe incorrect'})
        }
    }
    else
    {
        res.status(401).json({error: 'Utilisateur inexistant'})
    }


})

app.listen(3000, () => {
    console.log('app running on port 3000')
})