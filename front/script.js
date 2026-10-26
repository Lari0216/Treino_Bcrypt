const btnCadastrar = document.getElementById ('btn-cadastrar')
const btnLogar = document.getElementById ('btn-logar')


btnCadastrar.addEventListener('click', async () => {
    const response = await fetch ('http://localhost:3000/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify ({
        nome: document.getElementById('post-nome').value,
        email: document.getElementById('post-email').value,
        senha: document.getElementById('post-senha').value
        })
    })
    const data = await response.json()
    alert("Cadastro Realizado")
})


btnLogar.addEventListener('click', async () => {
    const response = await fetch ('http://localhost:3000/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify ({
        nome: document.getElementById('post-nome').value,
        email: document.getElementById('post-email').value,
        senha: document.getElementById('post-senha').value
        })
        
    })
    const data = await response.json()
    if(data != "Usuário Logado com Sucesso"){
        alert("Credenciais Inválidas")
    }else{
        window.location.replace('http://127.0.0.1:5501/front/telainicial.html')
    }
})