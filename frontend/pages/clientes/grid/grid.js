document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector(".clientes-grid tbody");
  const paginationContainer = document.getElementById("pagination");
  const prevButton = document.getElementById("prev-page");
  const nextButton = document.getElementById("next-page");
  const searchInput = document.getElementById("search");

  let clientes = [];
  let paginaAtual = 1;
  const itensPorPagina = 9;

  // Função para buscar os dados reais
  function CarregarClientes() {
    fetch('../../../backend/php/consultar_clientes.php')
      .then(response => response.json())
      .then(data => {
        clientes = data;
        AtualizarTabela(paginaAtual);
      })
      .catch(erro => console.error("Erro ao buscar clientes:", erro));
  }

  function AtualizarTabela(pagina) {
    const termo = searchInput.value.toLowerCase();
    const clientesFiltrados = clientes.filter(c =>
      c.nome.toLowerCase().includes(termo) ||
      c.codigo.toString().includes(termo) ||
      c.cpf_cnpj.toLowerCase().includes(termo)
    );

    const totalPaginas = Math.ceil(clientesFiltrados.length / itensPorPagina);
    RenderizarClientes(clientesFiltrados, tbody, pagina, itensPorPagina);
    RenderizarPagina(paginationContainer, pagina, totalPaginas, AtualizarTabela);

    prevButton.disabled = pagina === 1;
    nextButton.disabled = pagina === totalPaginas;
  }

  searchInput.addEventListener("input", () => {
    paginaAtual = 1;
    AtualizarTabela(paginaAtual);
  });

  ConfigurarNavegacao(prevButton, nextButton, () => {
    paginaAtual--;
    AtualizarTabela(paginaAtual);
  }, () => {
    paginaAtual++;
    AtualizarTabela(paginaAtual);
  });

  CarregarClientes();
  AbrirTelaCadastro();
});

function AbrirTelaCadastro() {
  document.getElementById("cadastrar").addEventListener("click", function () {
    window.location.href = "../../pages/clientes/cadastro/cadastro.php";
  });
}

function RenderizarClientes(clientes, tbody, paginaAtual, itensPorPagina) {
  const clientesPagina = ObterClientesDaPagina(clientes, paginaAtual, itensPorPagina);
  tbody.innerHTML = "";

  clientesPagina.forEach((cliente) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${cliente.codigo}</td>
      <td>${cliente.nome}</td>
      <td>${cliente.contato}</td>
      <td>${cliente.cep}</td>
      <td>${cliente.tipo}</td>
      <td>${cliente.cpf_cnpj}</td>
      <td>${cliente.status}</td>
      <td>
        <button class="editar" onclick="editarCliente(${cliente.codigo})">
          <span class="material-symbols-outlined">edit_square</span>
        </button>
        <button class="excluir" onclick="excluirCliente(${cliente.codigo})">
          <span class="material-symbols-outlined">delete</span>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function ObterClientesDaPagina(clientes, paginaAtual, itensPorPagina) {
  const inicio = (paginaAtual - 1) * itensPorPagina;
  return clientes.slice(inicio, inicio + itensPorPagina);
}

function RenderizarPagina(paginationContainer, paginaAtual, totalPaginas, AtualizarTabela) {
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

function ConfigurarNavegacao(prevButton, nextButton, onPrev, onNext) {
  prevButton.addEventListener("click", onPrev);
  nextButton.addEventListener("click", onNext);
}

// Exemplo de funções para editar/excluir (já chamadas nos botões):
function editarCliente(id) {
  window.location.href = `../cadastro/caadastro_cliente.php?codigo=${id}`;
}

function excluirCliente(id) {
  Swal.fire({
    title: 'Deseja realmente excluir?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, excluir',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = `../../../../../backend/models/clientes/excluir_cliente.php?codigo=${id}`;
    }
  });
}
