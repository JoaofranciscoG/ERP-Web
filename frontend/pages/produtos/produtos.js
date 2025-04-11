const ITENS_POR_PAGINA = 5;
let produtos = GerarProdutos(25);
let paginaAtual = 1;

document.addEventListener("DOMContentLoaded", function () {
  AtualizarTabela();
});

function GerarProdutos(qtd) {
  return Array.from({ length: qtd }, (_, i) => ({
    codigo: (i + 1).toString().padStart(3, "0"),
    nome: `Produto ${i + 1}`,
    descricao: `Descrição do Produto ${i + 1}`,
    preco: (Math.random() * 100).toFixed(2),
    categoria:
      i % 3 === 0 ? "Eletrônicos" : i % 3 === 1 ? "Roupas" : "Alimentos",
    quantidade: Math.floor(Math.random() * 100),
    estoque: i % 3 === 0 ? "Indiasponível" : "Disponível",
    unidade: i % 3 === 0 ? "UN" : "CX",
    imagem:
      i % 3 === 0
        ? "/frontend/assets/images/coca-cola.webp"
        : "/frontend/assets/images/pao.png",
  }));
}

function AdicionarProdutos(produtos, tabelaCorpo) {
  produtos.forEach((produto) => {
    const linha = document.createElement("tr");

    linha.innerHTML = `
      <td>${produto.codigo}</td>
      <td>${produto.nome}</td>
      <td>${produto.descricao}</td>
      <td>${produto.quantidade}</td>
      <td>R$ ${produto.preco}</td>
      <td>${produto.categoria}</td>
      <td>${produto.estoque}</td>
      <td>${produto.unidade}</td>
      <td>
        <div class="botoes-container">
          <button class="editar" onclick="MostrarDetalhes('${produto.codigo}')">
            <span class="material-symbols-outlined">edit_square</span>
          </button>
          <button class="excluir" onclick="MostrarDetalhes('${produto.codigo}')">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </div>
      </td>
    `;

    linha.addEventListener("click", () => MostrarDetalhes(produto));
    tabelaCorpo.appendChild(linha);
  });

  if (produtos.length > 0) {
    MostrarDetalhes(produtos[0]);
  }
}

function MostrarDetalhes(produto) {
  document.getElementById("produto-imagem").src = produto.imagem;
  document.getElementById("produto-info").innerHTML = `
    <h3>${produto.nome}</h3>
    <p>${produto.descricao}</p>
    <p><strong>Código:</strong> ${produto.codigo}</p>
    <p><strong>Quantidade:</strong> ${produto.quantidade}</p>
    <p><strong>Preço:</strong> R$ ${produto.preco}</p>
    <p><strong>Categoria:</strong> ${produto.categoria}</p>
    <p><strong>Estoque:</strong> ${produto.estoque}</p>
    <p><strong>Unidade:</strong> ${produto.unidade}</p>
  `;
}

function AtualizarTabela() {
  const tabelaCorpo = document.getElementById("tabela-corpo");
  tabelaCorpo.innerHTML = "";

  const inicio = (paginaAtual - 1) * ITENS_POR_PAGINA;
  const fim = inicio + ITENS_POR_PAGINA;
  const produtosPagina = produtos.slice(inicio, fim);

  AdicionarProdutos(produtosPagina, tabelaCorpo);
  AtualizarPaginacao();
}

function AtualizarPaginacao() {
  const totalPaginas = Math.ceil(produtos.length / ITENS_POR_PAGINA);
  const paginacaoContainer = document.getElementById("pagination");
  paginacaoContainer.innerHTML = `
    <button id="prev-page" class="pagination-btn" ${
      paginaAtual === 1 ? "disabled" : ""
    }>Anterior</button>
    <div id="page-numbers"></div>
    <button id="next-page" class="pagination-btn" ${
      paginaAtual === totalPaginas ? "disabled" : ""
    }>Próximo</button>`;

  const pageNumbersContainer = document.getElementById("page-numbers");
  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement("button");
    btn.classList.add("pagination-btn");

    if (i === paginaAtual) btn.classList.add("active");
    btn.textContent = i;
    btn.addEventListener("click", () => {
      paginaAtual = i;
      AtualizarTabela();
    });
    pageNumbersContainer.appendChild(btn);
  }

  document.getElementById("prev-page").addEventListener("click", () => {
    if (paginaAtual > 1) {
      paginaAtual--;
      AtualizarTabela();
    }
  });

  document.getElementById("next-page").addEventListener("click", () => {
    if (paginaAtual < totalPaginas) {
      paginaAtual++;
      AtualizarTabela();
    }
  });
}
