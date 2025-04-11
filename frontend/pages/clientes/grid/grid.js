document.addEventListener("DOMContentLoaded", () => {
  const clientes = GerarClientes(30);
  const tbody = document.querySelector(".clientes-grid tbody");
  const paginationContainer = document.getElementById("pagination");
  const prevButton = document.getElementById("prev-page");
  const nextButton = document.getElementById("next-page");

  let paginaAtual = 1;
  const itensPorPagina = 9;
  const totalPaginas = Math.ceil(clientes.length / itensPorPagina);

  function AtualizarTabela(pagina) {
    RenderizarClientes(clientes, tbody, pagina, itensPorPagina);
    RenderizarPagina(
      paginationContainer,
      pagina,
      totalPaginas,
      AtualizarTabela
    );

    prevButton.disabled = pagina === 1;
    nextButton.disabled = pagina === totalPaginas;
  }

  ConfigurarNavegacao(
    prevButton,
    nextButton,
    paginaAtual,
    totalPaginas,
    AtualizarTabela
  );
  AtualizarTabela(paginaAtual);

  AbrirTelaCadastro();
});

function AbrirTelaCadastro() {
  document.getElementById("cadastrar").addEventListener("click", function () {
    window.location.href = "../../pages/clientes/cadastro/cadastro.php";
  });
}

function GerarClientes(qtd) {
  return Array.from({ length: qtd }, (_, i) => ({
    codigo: (i + 1).toString().padStart(3, "0"),
    nome: `Cliente ${i + 1}`,
    contato: `(11) 9${i % 10}${i % 10}${i % 10}${i % 10}-000${i % 10}`,
    cep: `0100${i % 10}-000`,
    tipo: i % 2 === 0 ? "Físico" : "Jurídico",
    cpfcnpj:
      i % 2 === 0 ? `123.456.78${i % 10}-00` : `12.345.678/0001-${i % 10}9`,
    status: i % 3 === 0 ? "Inativo" : "Ativo",
  }));
}

function RenderizarClientes(clientes, tbody, paginaAtual, itensPorPagina) {
  const clientesPagina = ObterClientesDaPagina(
    clientes,
    paginaAtual,
    itensPorPagina
  );
  tbody.innerHTML = "";

  clientesPagina.forEach((cliente) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${cliente.codigo}</td>
      <td>${cliente.nome}</td>
      <td>${cliente.contato}</td>
      <td>${cliente.cep}</td>
      <td>${cliente.tipo}</td>
      <td>${cliente.cpfcnpj}</td>
      <td>${cliente.status}</td>
      <td>
        <button class="editar">
          <span class="material-symbols-outlined">edit_square</span>
        </button>
        <button class="excluir">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function ObterClientesDaPagina(clientes, paginaAtual, itensPorPagina) {
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  return clientes.slice(inicio, fim);
}

function RenderizarPagina(
  paginationContainer,
  paginaAtual,
  totalPaginas,
  AtualizarTabela
) {
  paginationContainer.innerHTML = "";
  for (let i = 1; i <= totalPaginas; i++) {
    const botaoPagina = document.createElement("button");
    botaoPagina.textContent = i;
    botaoPagina.classList.add("pagina");

    if (i === paginaAtual) botaoPagina.classList.add("ativa");
    botaoPagina.addEventListener("click", () => {
      paginaAtual = i;
      AtualizarTabela(paginaAtual);
    });

    paginationContainer.appendChild(botaoPagina);
  }
}

function ConfigurarNavegacao(
  prevButton,
  nextButton,
  paginaAtual,
  totalPaginas,
  AtualizarTabela
) {
  prevButton.addEventListener("click", () => {
    if (paginaAtual > 1) {
      paginaAtual--;
      AtualizarTabela(paginaAtual);
    }
  });

  nextButton.addEventListener("click", () => {
    if (paginaAtual < totalPaginas) {
      paginaAtual++;
      AtualizarTabela(paginaAtual);
    }
  });
}
