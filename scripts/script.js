// Index.html

document.addEventListener("DOMContentLoaded", () => {
    const pagina = document.body.id;
  
    if (pagina === "pagina-index") {
      const botaoAluno = document.querySelector(".inscrever");
      const botaoAdm = document.querySelector(".admin");
  
      botaoAluno.addEventListener("click", () => {
        window.location.href = "cadastroaluno.html";
      });
  
      botaoAdm.addEventListener("click", () => {
        window.location.href = "loginalunoadm.html";
      });
    }
  });

  // Cadastro Aluno

  let pagina = null;

  document.addEventListener("DOMContentLoaded", () => {
    pagina = document.body.id;
    console.log(pagina);
  
    // Página de Cadastro
    if (pagina === "pagina-cadastro") {
      const form = document.getElementById("form-cadastro");
  
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        
        // Gera um ID único
        const id = Date.now();
        const nome = form.nome.value.trim();
        const email = form.email.value.trim().toLowerCase();
        const senha = form.senha.value;
  
        // Pega os cadastros existentes ou cria array vazio
        let alunos = JSON.parse(localStorage.getItem("alunos")) || [];
  
        // Verifica se já existe o email
        const jaExiste = alunos.some(aluno => aluno.email === email);
  
        if (jaExiste) {
          alert("Erro: Já existe um aluno com este email.");
          return;
        }
  
        // Adiciona novo aluno
        alunos.push({ id, nome, email, senha });
  
        // Salva no localStorage
        localStorage.setItem("alunos", JSON.stringify(alunos));
  
        alert("Cadastro realizado com sucesso!");
        window.location.href = "loginalunoadm.html";
      });
    }

    // Pagina de login

    if (pagina == "pagina-login") {
        console.log("Página de login carregada");
        const form = document.getElementById("form-login");
    
        form.addEventListener("submit", function (e) {
          e.preventDefault();
    
          const email = form.email.value.trim().toLowerCase();
          const senha = form.senha.value;
    
          // Login do admin fixo
          const admin = {
            email: "admin@interclasse.com",
            senha: "admin123"
          };
    
          // Verificação se é admin
          if (email === admin.email && senha === admin.senha) {
            alert("Login de administrador realizado com sucesso!");
            window.location.href = "painel-adm.html";
            return;
          }
    
          // Verificação se é aluno
          const alunos = JSON.parse(localStorage.getItem("alunos")) || [];
    
          const indexEncontrado = alunos.findIndex(aluno => aluno.email === email && aluno.senha === senha);
          const alunoEncontrado = alunos[indexEncontrado];
          console.log(alunoEncontrado);
    
          if (alunoEncontrado) {
            alert("Login de aluno realizado com sucesso!");
            sessionStorage.setItem("alunoLogado", JSON.stringify(alunoEncontrado));
            localStorage.setItem("atleta_index_logado", indexEncontrado); // <- ESSENCIAL
          
            // Tenta recuperar a ficha do aluno usando o ID
            const ficha = JSON.parse(localStorage.getItem(`ficha_${alunoEncontrado.id}`));
          
            // Se a ficha existir, redireciona para o painel, senão para a tela de ficha
            if (ficha &&
                ficha.nomeCompleto &&
                ficha.nomeUniforme &&
                ficha.numero &&
                ficha.melhorPe) {
              window.location.href = "painel-aluno.html";
            } else {
              window.location.href = "telaFicha.html";
            }
          }
        });
      }

  });




  // Painel Aluno

  const STORAGE_ATLETAS = "interclasse_atletas";
      const STORAGE_CLASSIFICACAO = "interclasse_classificacao";
      const STORAGE_INDEX_LOGADO = "atleta_index_logado";

      const listaAtletasEl = document.getElementById("lista-atletas-aluno");
      const tabelaClassificacaoEl = document.getElementById(
        "tabela-classificacao-aluno"
      );

      function carregarAtletas() {
        const atletasLS = localStorage.getItem(STORAGE_ATLETAS);
        const atletas = atletasLS ? JSON.parse(atletasLS) : [];

        listaAtletasEl.innerHTML = "";
        if (atletas.length === 0) {
          listaAtletasEl.innerHTML =
            '<tr><td colspan="6">Nenhum atleta cadastrado.</td></tr>';
          return;
        }

        atletas.sort((a, b) => (b.gols || 0) - (a.gols || 0));

        atletas.forEach((atleta, index) => {
          const tr = document.createElement("tr");

          const tdNome = document.createElement("td");
          const link = document.createElement("span");
          link.textContent = atleta.nome || "Sem nome";
          link.style.cursor = "pointer";
          link.style.color = "#007bff";
          link.style.textDecoration = "none";
          link.onclick = () => mostrarPerfil(index);
          tdNome.appendChild(link);
          tr.appendChild(tdNome);

          const tdGols = document.createElement("td");
          tdGols.textContent = atleta.gols || 0;
          tr.appendChild(tdGols);

          const tdAssist = document.createElement("td");
          tdAssist.textContent = atleta.assistencias || 0;
          tr.appendChild(tdAssist);

          const tdJogos = document.createElement("td");
          tdJogos.textContent = atleta.jogos || 0;
          tr.appendChild(tdJogos);

          const tdAmarelos = document.createElement("td");
          tdAmarelos.textContent = atleta.cartoesAmarelos || 0;
          tr.appendChild(tdAmarelos);

          const tdVermelhos = document.createElement("td");
          tdVermelhos.textContent = atleta.cartoesVermelhos || 0;
          tr.appendChild(tdVermelhos);

          listaAtletasEl.appendChild(tr);
        });
      }

      function carregarClassificacao() {
        const classificacaoLS = localStorage.getItem(STORAGE_CLASSIFICACAO);
        const classificacao = classificacaoLS
          ? JSON.parse(classificacaoLS)
          : [];

        tabelaClassificacaoEl.innerHTML = "";
        if (classificacao.length === 0) {
          tabelaClassificacaoEl.innerHTML =
            '<tr><td colspan="2">Nenhuma classificação registrada.</td></tr>';
          return;
        }

        classificacao.sort((a, b) => b.pontos - a.pontos);

        classificacao.forEach(({ clube, pontos }) => {
          const tr = document.createElement("tr");

          const tdClube = document.createElement("td");
          tdClube.textContent = clube;
          tr.appendChild(tdClube);

          const tdPontos = document.createElement("td");
          tdPontos.textContent = pontos;
          tr.appendChild(tdPontos);

          tabelaClassificacaoEl.appendChild(tr);
        });
      }

      function mostrarPerfil(index) {
        const atletas = JSON.parse(
          localStorage.getItem(STORAGE_ATLETAS) || "[]"
        );
        const atleta = atletas[index];

        if (!atleta) return;

        document.getElementById("card-nome-curto").textContent =
          atleta.nome || "";
        document.getElementById("card-numero").textContent = `Camisa ${
          atleta.numero || ""
        }`;
        document.getElementById("card-turma").textContent = atleta.turma || "";

        document.getElementById("card-nome-completo").textContent =
          atleta.nomeCompleto || atleta.nome || "";
        document.getElementById("card-uniforme").textContent =
          atleta.nomeUniforme || "";
        document.getElementById("card-camisa").textContent =
          atleta.numero || "";
        document.getElementById("card-pe").textContent =
          atleta.melhorPe || "Não informado";

        document.getElementById("perfilCard").style.display = "flex";
      }

      function fecharPerfil() {
        document.getElementById("perfilCard").style.display = "none";
      }

      function init() {
        const atletasLS = localStorage.getItem(STORAGE_ATLETAS);
        const atletas = atletasLS ? JSON.parse(atletasLS) : [];

        const indexLogadoStr = localStorage.getItem(STORAGE_INDEX_LOGADO);
        const indexLogado =
          indexLogadoStr !== null ? parseInt(indexLogadoStr, 10) : null;

        if (
          indexLogado === null ||
          isNaN(indexLogado) ||
          !atletas[indexLogado]
        ) {
          // Se não tiver índice de atleta logado válido, volta para login
          window.location.href = "loginalunoadm.html";
          return;
        }

        const atletaLogado = atletas[indexLogado];

        // Verifica se a ficha do atleta logado está preenchida
        if (!atletaLogado.fichaPreenchida) {
          window.location.href = "telaFicha.html";
          return;
        }

        carregarAtletas();
        carregarClassificacao();
      }

      init();



  
    
  

  