const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./user')
const env = require('../../.env')
const http = require('http')
const request = require('request')
const mysql = require(`mysql`);
const escdb = require ('../../config/web.config')


const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,12})/

const sendErrorsFromDB = (res, dbErrors) => {
    const errors = []
    _.forIn(dbErrors.errors, error => errors.push(error.message))
    return res.status(400).json({errors})
}

const login = (req, res, next) => {

    let login = req.body.login || ''
    let senha = req.body.senha || ''

    let id = ''
    let nome = ''
    let entrei = false


    VerificaLoginSenha(login, senha)
    .then(result => {
        console.log(result)
        
        if(result.entrei) {
            let id =  result.id
            let name = result.nome
            let token

            try {
                token = jwt.sign({ id, name, admin : true }, env.authSecret, {
                    expiresIn: "30 minutes"
                })
            } catch (error) {
                console.log('error :', error);
            }     

            console.log('E IGUAL')
            res.status(200).send({ id, name, token, logado})
        }else {
            console.log('nao E IGUAL')
            res.status(500).send("Usuário ou senha incorretos")        
        } 
        //res.status(200).send(result)
    })       
           
          /*  console.log('SAI DO CONN')
            if(entrei) {
                console.log('E IGUAL')
                res.status(200).send({ id, nome, logado})
            }else {
                console.log('nao E IGUAL')
                res.status(500).send("Usuário ou senha incorretos")        
            }*/     
            
    
   
}

const validateToken = (req, res, next) => {
    const token = req.body.token || ''
    jwt.verify(token, env.authSecret, function(err, decoded) {
        return res.status(200).send({valid: !err})
    })
}

const signup = (req, res, next) => {
    const name = req.body.name || ''
    const login = req.body.login || ''
    const telefone = req.body.telefone || ''
    const senha = req.body.senha || ''
    const senhaConfirma = req.body.senhaConfirma || ''

    /*
    if(!email.match(emailRegex)) {
        return res.status(400).send({errors: ['O e-mail informado está inválido']})
    }

    if(!password.match(passwordRegex)) {
        return res.status(400).send({errors: [
            "Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6-12."
        ]})
    }*/
    try {
        if(VerificaLogin(login))
        {
            return res.status(400).send({errors: ['Login Já existe.']})
        }
        
    
        const salt = bcrypt.genSaltSync()
       /* const passwordHash = bcrypt.hashSync(password, salt)
        if(!bcrypt.compareSync(confirmPassword, passwordHash)) {
            return res.status(400).send({errors: ['Senhas não conferem.']})
        }
    */
    
        var conn = mysql.createConnection(escdb);
        conn.connect();
    
        conn.query(`INSERT INTO TAB_PESSOA (NOME, TELEFONE) VALUES (?, ?)`  , 
        [name, telefone],  
            function (error, results, fiels) {
                if (error)
                    res.json(error)
                    const idPessoa = results.insertId
    
                conn.query(`INSERT INTO TAB_VENDEDOR (DATA_ADM, SALARIO, LOGIN, SENHA, PESSOA) 
                VALUES (NOW(), 2500.00, ?, ?, ?)`  ,
                [login, senha, idPessoa],  
                    function (error, results, fiels) {
                        if (error)
                            res.json(error)
                        else
                            res.json(results);
                        conn.end()
            
                })
        })               
    } catch (error) {
        return;        
    }
    
}

const VerificaLogin = (login) => {
    try {        
        var conn = mysql.createConnection(escdb);
        conn.connect();
        let loginExiste = false

        conn.query("SELECT COUNT(1) contador FROM TAB_VENDEDOR WHERE LOGIN = ?", login,
            function (error, results, fiels) {
                if(results[0].contador > 1)
                    loginExiste = true
                conn.end()

            })
        return loginExiste;   
    } catch (error) {
        return;        
    }
}

const VerificaLoginSenha = (login, senha) => {
    return new Promise((resolve, reject) => {
        let id = ''
        let nome = ''
        let entrei  = logado = false
        var conn = mysql.createConnection(escdb);
        conn.connect();

        conn.query("SELECT V.ID id, P.NOME nome, V.LOGIN login, V.SENHA senha FROM TAB_VENDEDOR V INNER JOIN TAB_PESSOA P ON V.PESSOA = P.ID WHERE V.LOGIN = ?", login,
            function (error, results, fiels) {
                try {
                    if (error)
                        res.json(error)
                    else {
                        if (results.length > 0 )
                        {
                            console.log("1: " + login +  "   2:  " + results[0].login)
                            console.log("1: " + senha +  "   2:  " + results[0].senha)
                            if(results[0].login == login && results[0].senha == senha)
                            {     
                                id = results[0].id
                                nome = results[0].nome
                                entrei = logado = true
                                /*token = jwt.sign({ email: 'pa@g.com.br', fullName : nome, _id, id }, env.authSecret, {
                                    expiresIn: "30 minutes"
                                })*/
                                
                            }
                            resolve({ id, nome, entrei, logado })
                        }
                    }
                    conn.end()
                } catch (e) {
                    reject(e)
                }                    
            })
        

        
    })
}

module.exports = { login, signup, validateToken }