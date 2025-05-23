document.addEventListener("DOMContentLoaded", () => {
    const pagina = document.body.id;
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
  });
  