const listaTarefas = document.getElementById("listaTarefas");
const entradaTarefa = document.getElementById("entradaTarefa");
const btnAdicionar = document.getElementById("btnAdicionar");

// Função para salvar lista no localStorage
function salvarLista() {
  const tarefas = [];
  listaTarefas.querySelectorAll("li").forEach(li => {
    tarefas.push({
      texto: li.firstChild.textContent, // só o texto, ignorando o botão remover
      concluida: li.classList.contains("list-group-item-secondary")
    });
  });
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Função para carregar lista do localStorage
function carregarLista() {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas.forEach(tarefa => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.textContent = tarefa.texto;

    if (tarefa.concluida) {
      li.classList.add("list-group-item-secondary", "text-decoration-line-through");
    }

    adicionarBotaoRemover(li);

    li.addEventListener("click", () => {
      li.classList.toggle("list-group-item-secondary");
      li.classList.toggle("text-decoration-line-through");
      salvarLista();
    });

    listaTarefas.appendChild(li);
  });
}

function adicionarBotaoRemover(li) {
  const btnRemover = document.createElement("button");
  btnRemover.innerHTML = "&times;"; // X para remover
  btnRemover.className = "btn btn-sm btn-danger ms-3";

  btnRemover.onclick = function (e) {
    e.stopPropagation();
    li.remove();
    salvarLista();
  };

  li.appendChild(btnRemover);
}

function adicionarTarefa() {
  const texto = entradaTarefa.value.trim();

  if (texto === "") {
    alert("Por favor, escreva uma tarefa!");
    return;
  }

  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";
  li.textContent = texto;

  adicionarBotaoRemover(li);

  li.addEventListener("click", () => {
    li.classList.toggle("list-group-item-secondary");
    li.classList.toggle("text-decoration-line-through");
    salvarLista();
  });

  listaTarefas.appendChild(li);

  entradaTarefa.value = "";
  entradaTarefa.focus();

  salvarLista();
}

btnAdicionar.addEventListener("click", adicionarTarefa);

entradaTarefa.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    adicionarTarefa();
  }
});

carregarLista();
 