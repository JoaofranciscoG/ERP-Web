document.addEventListener("DOMContentLoaded", () => {
  const clientes = GerarClientes(30);
  const tbody = document.querySelector(".clientes-grid tbody");
  const paginationContainer = document.getElementById("pagination");
  const prevButton = document.getElementById("prev-page");
  const nextButton = document.getElementById("next-page");

  const itensPorPagina = 8;
  let paginaAtual = 1;
  const totalPaginas = Math.ceil(clientes.length / itensPorPagina);

  //Essa função gera clientes aleatoriamente com as informações passadas, aleatoriza tudo.
  //Substituir por clientes reais

  function GerarClientes(qtd) {
    return Array.from({ length: qtd }, (_, i) => ({
      codigo : (i + 1).toString().padStart(3, "0"),
      nome   : `Cliente ${i + 1}`,
      contato: `(11) 9${i % 10}${i % 10}${i % 10}${i % 10}-000${i % 10}`,
      cep    : `0100${i % 10}-000`,
      tipo   : i % 2 === 0 ? "Físico" : "Jurídico",
      cpfcnpj: i % 2 === 0 ? `123.456.78${i % 10}-00` : `12.345.678/0001-${i % 10}9`,
      status : i % 3 === 0 ? "Inativo" : "Ativo",
    }));
  }

  function RenderizarClientes() {
    tbody.innerHTML = "";

    const clientesPagina = ObterClientesDaPagina();
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

  function ObterClientesDaPagina() {
    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    return clientes.slice(inicio, fim);
  }

  function RenderizarPagina() {
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPaginas; i++) {
      const botaoPagina = document.createElement("button");
      botaoPagina.textContent = i;
      botaoPagina.classList.add("pagina");

      if (i === paginaAtual) botaoPagina.classList.add("ativa");
      botaoPagina.addEventListener("click", () => {
        paginaAtual = i;
        AtualizarTabela();
      });

      paginationContainer.appendChild(botaoPagina);
    }

    prevButton.disabled = paginaAtual === 1;
    nextButton.disabled = paginaAtual === totalPaginas;
  }

  function AtualizarTabela() {
    RenderizarClientes();
    RenderizarPagina();
  }

  function ConfigurarNavegacao() {
    prevButton.addEventListener("click", () => {
      if (paginaAtual > 1) {
        paginaAtual--;
        AtualizarTabela();
      }
    });

    nextButton.addEventListener("click", () => {
      if (paginaAtual < totalPaginas) {
        paginaAtual++;
        AtualizarTabela();
      }
    });
  }

  ConfigurarNavegacao();
  AtualizarTabela();
});
