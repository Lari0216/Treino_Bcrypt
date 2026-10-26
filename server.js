import express from "express"; 
import cors from "cors"
import pool from "./front/db.js"
import bcrypt from "bcryptjs";

const PORT = 3000
const app = express()

app.use(cors())
app.use(express.json())

app.get('/usuario', async (req, res) => {
    const usuario = await pool.query('SELECT * FROM usuarios')
    res.json(usuario.rows)
})

app.post('/register', async (req, res) => {
    const {nome, email, senha} = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(senha, salt)
    
    const novoUsuario = await pool.query('INSERT INTO usuarios (nome, email, senha) VALUES($1, $2, $3) RETURNING *', [nome, email, hashedPassword])
    res.json(novoUsuario.rows)
})

app.post('/login', async (req, res) => {
    const {nome, email, senha} = req.body

    const queryText = "SELECT * FROM usuarios WHERE nome = $1 AND email = $2"
    const result = await pool.query(queryText, [nome, email])
    const user = result.rows[0]

    if(!user){
        return res.status(400).json({error: "Credenciais Inválidas"})
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha)

    if(!isPasswordValid){
        return res.status(401).json({error: "Credenciais Inválidas"})
    }
    if(nome.trim() === "" || email.trim() === "" || senha.trim() === "" ){ //"situação do código"/remove espaçoso em branco
        return res.json('Preencha todos os campos')
    }

    res.json("Usuário Logado com Sucesso")
})

app.listen(PORT, () => {
    console.log("API rodando em http://localhost:3000")
})