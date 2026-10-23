const btnCadastrar = document.getElementById ('btn-cadastrar')

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
    console.log(data)
})