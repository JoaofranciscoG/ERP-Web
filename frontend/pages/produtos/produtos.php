<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="stylesheet" href="../../assets/global/global.css">
    <link rel="stylesheet" href="produtos.css" />

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css"/>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <title>ERP Fácil - Produtos</title>
  </head>
  <body>
    <div class="container">
      <div class="menu-lateral"></div>
      <main>
        <h1>Produtos</h1>
        <div class="top-bar">
          <input type="text" id="search" placeholder="Pesquisar produtos..." />
          <button id="cadastrar">Cadastrar</button>
        </div>

        <div class="layout-produtos">
          <div class="tabela-container">
            <table class="tabela-produtos">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nome</th>
                  <th>Descrição</th>
                  <th>Quantidade</th>
                  <th>Preço</th>
                  <th>Categoria</th>
                  <th>Estoque</th>
                  <th>Unidade</th>
                  <th id="acoes">Ações</th>
                </tr>
              </thead>
              <tbody id="tabela-corpo">
                <!-- dinamicamente -->
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="9">
                    <div id="pagination" class="pagination-container">
                      <button id="prev-page" class="pagination-btn">
                        Anterior
                      </button>
                      <!-- paginas geradas dinamicamente -->
                      <button id="next-page" class="pagination-btn">
                        Próximo
                      </button>
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div class="produto-detalhes">
            <h2>Detalhes do Produto</h2>
            <img
              id="produto-imagem"
              src=""
              alt="Imagem do Produto"
              class="imagem-detalhe"
            />
            <div id="produto-info">
              <!--  -->
            </div>
          </div>
        </div>
      </main>
    </div>

    <script src="/frontend/assets/global/global.js"></script>
    <script type="module" src="../../components/sidebar/sidebar.js"></script>
    <script src="./produtos.js"></script>
  </body>
</html>
