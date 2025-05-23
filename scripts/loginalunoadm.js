document.addEventListener("DOMContentLoaded", () => {
    const pagina = document.body.id;
  
    if (pagina === "pagina-login") {
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
  
        if (alunoEncontrado) {
          alert("Login de aluno realizado com sucesso!");
          sessionStorage.setItem("alunoLogado", JSON.stringify(alunoEncontrado));
          localStorage.setItem("atleta_index_logado", indexEncontrado); // <- ESSENCIAL
  
          // Tenta recuperar a ficha do aluno usando o ID
          const ficha = JSON.parse(localStorage.getItem(`ficha_${alunoEncontrado.id}`));
  
          // Se a ficha existir, redireciona para o painel, senão para a tela de ficha
          if (
            ficha &&
            ficha.nomeCompleto &&
            ficha.nomeUniforme &&
            ficha.numero &&
            ficha.melhorPe
          ) {
            window.location.href = "painel-aluno.html";
          } else {
            window.location.href = "telaFicha.html";
          }
        } else {
          alert("Email ou senha incorretos.");
        }
      });
    }
  });
  