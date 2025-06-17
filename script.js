const entradaTarefa = document.getElementById("entradaTarefa");
const btnAdicionar = document.getElementById("btnAdicionar");
const tarefasPendentes = document.getElementById("tarefasPendentes");
const tarefasConcluidas = document.getElementById("tarefasConcluidas");

function salvarLista() {
  const tarefas = [];
  document.querySelectorAll("#tarefasPendentes li, #tarefasConcluidas li").forEach(li => {
    tarefas.push({
      texto: li.querySelector(".texto").textContent,
      concluida: li.parentElement.id === "tarefasConcluidas"
    });
  });
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarLista() {
  const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
  tarefas.forEach(tarefa => {
    criarTarefaNaLista(tarefa.texto, tarefa.concluida);
  });
}

function criarTarefaNaLista(texto, concluida = false) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";

  const spanTexto = document.createElement("span");
  spanTexto.className = "texto";
  spanTexto.textContent = texto;
  const botoes = document.createElement("div");
  botoes.className = "d-flex gap-2";

  const btnToggle = document.createElement("button");
  btnToggle.className = "btn btn-sm btn-outline-success";
  btnToggle.innerHTML = concluida ? "Reabrir" : "Concluir";
  btnToggle.onclick = () => {
    li.remove();
    criarTarefaNaLista(texto, !concluida);
    salvarLista();
  };

  const btnRemover = document.createElement("button");
  btnRemover.className = "btn btn-sm btn-outline-danger";
  btnRemover.textContent = "Remover";
  btnRemover.onclick = () => {
    li.remove();
    salvarLista();
  };

  botoes.appendChild(btnToggle);
  botoes.appendChild(btnRemover);
  li.appendChild(spanTexto);
  li.appendChild(botoes);

  (concluida ? tarefasConcluidas : tarefasPendentes).appendChild(li);
}

function adicionarTarefa() {
  const texto = entradaTarefa.value.trim();
  if (texto === "") {
    alert("Por favor, digite uma tarefa.");
    return;
  }

  criarTarefaNaLista(texto, false);
  entradaTarefa.value = "";
  entradaTarefa.focus();
  salvarLista();
}

btnAdicionar.addEventListener("click", adicionarTarefa);
entradaTarefa.addEventListener("keydown", (e) => {
  if (e.key === "Enter") adicionarTarefa();
});

carregarLista();
