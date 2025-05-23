// ficha do Aluno

const STORAGE_ALUNOS = "alunos";
const CHAVE_ALUNO_LOGADO = "alunoLogado";

window.addEventListener("DOMContentLoaded", () => {
  const alunoLogado = JSON.parse(sessionStorage.getItem(CHAVE_ALUNO_LOGADO));

  if (!alunoLogado) {
    alert("Nenhum aluno logado encontrado. Redirecionando para login.");
    window.location.href = "loginalunoadm.html"; // Ajuste para sua página de login
    return;
  }

  // Preencher nome no formulário
  document.getElementById("nome").value = alunoLogado.nome || "";

  // Se quiser preencher os outros campos caso o aluno já tenha dados na ficha, faça aqui:
  document.getElementById("nomeUniforme").value =
    alunoLogado.nomeUniforme || "";
  document.getElementById("numero").value = alunoLogado.numero || "";
  document.getElementById("nascimento").value =
    alunoLogado.nascimento || "";
  document.getElementById("turma").value = alunoLogado.turma || "";
  document.getElementById("time").value = alunoLogado.time || "";
  document.getElementById("melhorPe").value =
    alunoLogado.melhorPe || "Direito";
});

document
  .getElementById("ficha-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    let alunos = JSON.parse(localStorage.getItem(STORAGE_ALUNOS)) || [];
    let alunoLogado = JSON.parse(sessionStorage.getItem(CHAVE_ALUNO_LOGADO));

    if (!alunoLogado) {
      alert("Nenhum aluno logado encontrado. Redirecionando para login.");
      window.location.href = "loginalunoadm.html";
      return;
    }

    // Atualiza os dados do aluno logado com os valores do formulário
    alunoLogado.nome = document.getElementById("nome").value.trim();
    alunoLogado.nomeUniforme = document
      .getElementById("nomeUniforme")
      .value.trim();
    alunoLogado.numero = document.getElementById("numero").value.trim();
    alunoLogado.nascimento = document.getElementById("nascimento").value;
    alunoLogado.turma = document.getElementById("turma").value;
    alunoLogado.time = document.getElementById("time").value;
    alunoLogado.melhorPe = document.getElementById("melhorPe").value;

    alunoLogado.fichaPreenchida = true;

    // Atualiza o array de alunos
    const index = alunos.findIndex((aluno) => aluno.id === alunoLogado.id);
    if (index !== -1) {
      alunos[index] = alunoLogado;
    } else {
      alunos.push(alunoLogado);
    }

    // Salva os dados atualizados
    localStorage.setItem(STORAGE_ALUNOS, JSON.stringify(alunos));
    localStorage.setItem(CHAVE_ALUNO_LOGADO, JSON.stringify(alunoLogado));

    // Salva os dados da ficha separadamente para a verificação no login
    localStorage.setItem(
      `ficha_${alunoLogado.id}`,
      JSON.stringify({
        nomeCompleto: alunoLogado.nome,
        nomeUniforme: alunoLogado.nomeUniforme,
        numero: alunoLogado.numero,
        nascimento: alunoLogado.nascimento,
        turma: alunoLogado.turma,
        time: alunoLogado.time,
        melhorPe: alunoLogado.melhorPe,
        altura: alunoLogado.altura,
        peso: alunoLogado.peso,
  gols: 0,
  assistencias: 0,
  jogos: 0,
  cartoesAmarelo: 0,
  cartoesVermelho: 0			
      })
    );

    alert("Ficha preenchida com sucesso!");
    window.location.href = "painel-aluno.html";
      });