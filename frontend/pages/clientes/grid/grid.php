<?php
session_start();
include_once '../../../../backend/models/conexao.php';

$database_empresa = $_SESSION['database_empresa'];

$db = new Database($database_empresa);
$db->AbrirConexao();
$conn = $db->getConnection();

$query = "SELECT 
    CLI_CODIGO,
    CLI_NOME,
    CLI_EMAIL,
    CLI_CEP,
    CLI_TIPO,
    CLI_CPF_CNPJ
FROM CLIENTES
ORDER BY CLI_NOME ASC";

$result = pg_query($conn, $query);

$clientes = [];

if ($result) {
    while ($row = pg_fetch_assoc($result)) {
        $clientes[] = [
            'codigo'    => $row['cli_codigo'],
            'nome'      => $row['cli_nome'],
            'contato'   => $row['cli_email'],
            'cep'       => $row['cli_cep'],
            'tipo'      => $row['cli_tipo'] === 'F' ? 'Físico' : 'Jurídico',
            'cpf_cnpj'  => $row['cli_cpf_cnpj']
        ];
    }
}

$db->FecharConexao();
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="../../../assets/global/global.css">
  <link rel="stylesheet" href="grid.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css"/>
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <title>ERP Fácil - Clientes</title>
</head>
<body>
  <div class="container">
    <div class="menu-lateral"></div>
    <main>
      <h1>Clientes</h1>
      <div class="top-bar">
        <input type="text" id="search" placeholder="Pesquisar clientes..." />
        <button id="cadastrar" onclick="window.location.href='../cadastro/cadastro_cliente.php'">Cadastrar</button>
      </div>

      <table class="clientes-grid">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Contato</th>
            <th>CEP</th>
            <th>Tipo</th>
            <th>CPF / CNPJ</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody id="clientes-tbody">
          <?php foreach ($clientes as $cliente): ?>
            <tr>
              <td><?= htmlspecialchars($cliente['codigo']) ?></td>
              <td><?= htmlspecialchars($cliente['nome']) ?></td>
              <td><?= htmlspecialchars($cliente['contato']) ?></td>
              <td><?= htmlspecialchars($cliente['cep']) ?></td>
              <td><?= htmlspecialchars($cliente['tipo']) ?></td>
              <td><?= htmlspecialchars($cliente['cpf_cnpj']) ?></td>
              <td>
                <button onclick="editarCliente(<?php echo $cliente['codigo'] ?>)">Editar</button>
                <button onclick="excluirCliente(<?php echo $cliente['codigo']; ?>)">Excluir</button>

              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>

      <div class="pagination-container">
        <button id="prev-page">Anterior</button>
        <div id="pagination"></div>
        <button id="next-page">Próximo</button>
      </div>
    </main>
  </div>

  <script src="../../assets/global/global.js"></script>
  <script type="module" src="../../../components/sidebar/sidebar.js"></script>
  <script>
  function editarCliente(id) {
    window.location.href = '../cadastro/cadastro_cliente.php?codigo=' + id;
  }

  function excluirCliente(id) {
    Swal.fire({
      title: 'Tem certeza?',
      text: "Essa ação não pode ser desfeita!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '../../../../backend/models/clientes/excluir_cliente.php?codigo=' + id;
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.getElementById("clientes-tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));
    const itensPorPagina = 10;
    let paginaAtual = 1;

    const prevBtn = document.getElementById("prev-page");
    const nextBtn = document.getElementById("next-page");
    const paginationContainer = document.getElementById("pagination");

    function atualizarTabela() {
      const totalPaginas = Math.ceil(rows.length / itensPorPagina);
      paginaAtual = Math.max(1, Math.min(paginaAtual, totalPaginas));

      rows.forEach((row, index) => {
        row.style.display = (index >= (paginaAtual - 1) * itensPorPagina && index < paginaAtual * itensPorPagina) ? "" : "none";
      });

      prevBtn.disabled = paginaAtual === 1;
      nextBtn.disabled = paginaAtual === totalPaginas;

      renderizarBotoes(totalPaginas);
    }

    function renderizarBotoes(totalPaginas) {
      paginationContainer.innerHTML = "";
      for (let i = 1; i <= totalPaginas; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        if (i === paginaAtual) btn.classList.add("ativa");
        btn.addEventListener("click", () => {
          paginaAtual = i;
          atualizarTabela();
        });
        paginationContainer.appendChild(btn);
      }
    }

    prevBtn.addEventListener("click", () => {
      if (paginaAtual > 1) {
        paginaAtual--;
        atualizarTabela();
      }
    });

    nextBtn.addEventListener("click", () => {
      const totalPaginas = Math.ceil(rows.length / itensPorPagina);
      if (paginaAtual < totalPaginas) {
        paginaAtual++;
        atualizarTabela();
      }
    });

    atualizarTabela();
  });
</script>

</body>
</html>
