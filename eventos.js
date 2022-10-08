async function addContato() {
    let dados = input_nova_tarefa.value.split(" ");
    let nome = dados[0];
    let idade = dados[1];

    let dadosPush = await fetch("https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa", {
        method:"POST",
        // ato de fé
        headers: {
            "content-type": "application/json",
        },
        // conteudo que eu desejo enviar
        body: JSON.stringify({
            idade: idade,
            nome: nome,
        }),
    });
    if (dadosPush.ok) {
        console.log("adicionei")
        atualizarContatos()
    }
}


atualizarContatos();

async function atualizarContatos() {
    let resposta = await fetch("https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa")
    let body = await resposta.json()
    tarefas.innerHTML = "<ul>"
    body.forEach(pessoa => {
        tarefas.innerHTML += `  <li>${pessoa.nome} - ${pessoa.idade} <button onclick="deletar(${pessoa.id})">Deletar</button></li>`
    });
    tarefas.innerHTML += "</ul>"
}

async function deletar(identificador) {
    console.log("deletarei o " + identificador)

    let res = await fetch("https://633867b7937ea77bfdbf9c86.mockapi.io/pessoa/" + identificador, {
        method: "DELETE"
    })
    if (res.ok) {
        atualizarContatos()

    }
}


