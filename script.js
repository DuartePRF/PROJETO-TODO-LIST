const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-tasks')

let minhaListaDeItens = []

input.addEventListener('input', function(event) {
  if (input.value.length > 35) {
    input.value = input.value.slice(0, 35);
  }
});


function adicionarNovaTarefa() {
  if (input.value.trim() !== '') {
    minhaListaDeItens.push({
      tarefa: input.value,
      concluida: false,
    });
    
    input.value = '';

    mostrarTarefas();
  }
}



function mostrarTarefas() {
  let novaLi = ''

  minhaListaDeItens.forEach((item, posicao) => {
    novaLi =
      novaLi +
      `

        <li class="task ${item.concluida && 'done'}">
            <img src="./img/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
            <p>${item.tarefa}</p>
            <img src="./img/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
        </li>
        
        `
  })

  listaCompleta.innerHTML = novaLi

  localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))
}

input.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    
    adicionarNovaTarefa()
  }
});

function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida

  mostrarTarefas()
}

function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1)

  mostrarTarefas()
}

function recarregarTarefas() {
  const tarefasDoLocalStorage = localStorage.getItem('lista')

  if (tarefasDoLocalStorage) {
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
  }

  mostrarTarefas()
}

recarregarTarefas()
button.addEventListener('click', adicionarNovaTarefa)