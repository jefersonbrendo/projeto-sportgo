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