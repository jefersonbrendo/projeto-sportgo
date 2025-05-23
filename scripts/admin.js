// scripts/admin.js

// Chaves para localStorage
const STORAGE_ATLETAS = "alunos";
const STORAGE_CLASSIFICACAO = "interclasse_classificacao";

// DOM Elements
const listaAtletasEl = document.getElementById("lista-atletas");
const adicionarAtletaBtn = document.getElementById("adicionar-atleta");
const salvarClassificacaoBtn = document.getElementById("salvar-classificacao");
const tabelaClassificacaoEl = document.getElementById("tabela-classificacao");

let atletas = [];
let classificacao = [];

// Carregar dados do localStorage ou inicializar
function carregarDados() {
  const atletasLS = localStorage.getItem(STORAGE_ATLETAS);
  atletas = atletasLS ? JSON.parse(atletasLS) : [];

  const classificacaoLS = localStorage.getItem(STORAGE_CLASSIFICACAO);
  classificacao = classificacaoLS ? JSON.parse(classificacaoLS) : null;

  if (classificacao) {
    // Atualiza tabela da classificação
    for (let i = 0; i < classificacao.length; i++) {
      const tr = tabelaClassificacaoEl.rows[i];
      if (tr) {
        tr.cells[1].textContent = classificacao[i].pontos;
      }
    }
  }
}

// Salvar dados no localStorage
function salvarDados() {
  localStorage.setItem(STORAGE_ATLETAS, JSON.stringify(atletas));

  // Salvar classificação da tabela editável
  const novaClassificacao = [];
  for (let i = 0; i < tabelaClassificacaoEl.rows.length; i++) {
    const tr = tabelaClassificacaoEl.rows[i];
    const clube = tr.cells[0].textContent.trim();
    let pts = tr.cells[1].textContent.trim();
    pts = Number(pts);
    novaClassificacao.push({ clube, pontos: isNaN(pts) ? 0 : pts });
  }
  localStorage.setItem(
    STORAGE_CLASSIFICACAO,
    JSON.stringify(novaClassificacao)
  );
  alert("Dados salvos com sucesso!");
}

function atualizarFicha(id, campo, valor) {
  const ficha = JSON.parse(localStorage.getItem(`ficha_${id}`)) || {};
  ficha[campo] = valor;
  localStorage.setItem(`ficha_${id}, JSON.stringify(ficha)`);
}

// Renderizar a lista de atletas na tabela
function renderizarAtletas() {
  listaAtletasEl.innerHTML = ""; // limpa

  atletas.forEach((atleta, index) => {
    const tr = document.createElement("tr");

    // Nome - input text editável
    const tdNome = document.createElement("td");
    const inputNome = document.createElement("input");
    inputNome.type = "text";
    inputNome.value = atleta.nome;
    inputNome.addEventListener(
      "input",
      (e) => (atletas[index].nome = e.target.value)
    );
    tdNome.appendChild(inputNome);
    tr.appendChild(tdNome);

    // Gols
    const tdGols = document.createElement("td");
    const inputGols = document.createElement("input");
    inputGols.type = "number";
    inputGols.min = 0;
    inputGols.value = atleta.gols;
    inputGols.addEventListener("input", (e) => {
      const valor = Number(e.target.value);
      atletas[index].gols = valor;
      atualizarFicha(atletas[index].id, "gols", valor);
    });

    tdGols.appendChild(inputGols);
    tr.appendChild(tdGols);

    // Assistências
    const tdAssist = document.createElement("td");
    const inputAssist = document.createElement("input");
    inputAssist.type = "number";
    inputAssist.min = 0;
    inputAssist.value = atleta.assistencias;
    inputAssist.addEventListener("input", (e) => {
      const valor = Number(e.target.value);
      atletas[index].assistencias = valor;
      atualizarFicha(atletas[index].id, "assistencias", valor);
    });
    tdAssist.appendChild(inputAssist);
    tr.appendChild(tdAssist);

    // Jogos
    const tdJogos = document.createElement("td");
    const inputJogos = document.createElement("input");
    inputJogos.type = "number";
    inputJogos.min = 0;
    inputJogos.value = atleta.jogos;
    inputJogos.addEventListener("input", (e) => {
      const valor = Number(e.target.value);
      atletas[index].jogos = valor;
      atualizarFicha(atletas[index].id, "jogos", valor);
    });
    tdJogos.appendChild(inputJogos);
    tr.appendChild(tdJogos);

    // Cartões Amarelos
    const tdAmarelos = document.createElement("td");
    const inputAmarelos = document.createElement("input");
    inputAmarelos.type = "number";
    inputAmarelos.min = 0;
    inputAmarelos.value = atleta.cartoesAmarelos;
    inputAmarelos.addEventListener("input", (e) => {
      const valor = Number(e.target.value);
      atletas[index].cartoesAmarelos = valor;
      atualizarFicha(atletas[index].id, "cartoesAmarelos", valor);
    });
    tdAmarelos.appendChild(inputAmarelos);
    tr.appendChild(tdAmarelos);

    // Cartões Vermelhos
    const tdVermelhos = document.createElement("td");
    const inputVermelhos = document.createElement("input");
    inputVermelhos.type = "number";
    inputVermelhos.min = 0;
    inputVermelhos.value = atleta.cartoesVermelhos;
    inputVermelhos.addEventListener("input", (e) => {
      const valor = Number(e.target.value);
      atletas[index].cartoesVermelhos = valor;
      atualizarFicha(atletas[index].id, "cartoesVermelhos", valor);
    });
    tdVermelhos.appendChild(inputVermelhos);
    tr.appendChild(tdVermelhos);

    // Ações - botão excluir
    const tdAcoes = document.createElement("td");
    const btnExcluir = document.createElement("button");
    btnExcluir.textContent = "Excluir";
    btnExcluir.style.cursor = "pointer";
    btnExcluir.addEventListener("click", () => {
      if (confirm(`Deseja excluir o atleta "${atletas[index].nome}"?`)) {
        atletas.splice(index, 1);
        renderizarAtletas();
        salvarDados();
      }
    });
    tdAcoes.appendChild(btnExcluir);
    tr.appendChild(tdAcoes);

    listaAtletasEl.appendChild(tr);
  });
}


// Evento para salvar classificação
salvarClassificacaoBtn.addEventListener("click", () => {
  salvarDados();
});

// Inicializa o painel
function init() {
  carregarDados();
  renderizarAtletas();
}
init();

console.log(atletas);
