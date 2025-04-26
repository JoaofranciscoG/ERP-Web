<?php
session_start();
include_once '../../../../backend/models/conexao.php';

$codigoCliente = $_GET['codigo'] ?? '';
$cliente = null;

if ($codigoCliente) {
    $database_empresa = $_SESSION['database_empresa'];
    $db = new Database($database_empresa);
    $db->AbrirConexao();

    $conn = $db->getConnection();

    $query = "SELECT 
        CLI_CODIGO,
        CLI_NOME,
        CLI_EMAIL,
        CLI_TELEFONE,
        CLI_TIPO,
        CLI_CPF_CNPJ,
        CLI_CEP,
        CLI_ENDERECO,
        CLI_BAIRRO,
        CLI_CIDADE,
        CLI_UF
    FROM CLIENTES
    WHERE CLI_CODIGO = $1";
    $params = [$codigoCliente];
    
    $result = pg_query_params($conn, $query, $params);

    if ($result && pg_num_rows($result) > 0) {
        $row = pg_fetch_assoc($result);

        $cliente = [
            'CLI_CODIGO'   => $row['cli_codigo'],
            'CLI_NOME'     => $row['cli_nome'],
            'CLI_EMAIL'    => $row['cli_email'],
            'CLI_TIPO'     => $row['cli_tipo'],
            'CLI_TELEFONE' => $row['cli_telefone'],
            'CLI_CPF_CNPJ' => $row['cli_cpf_cnpj'],
            'CLI_CEP'      => $row['cli_cep'],
            'CLI_ENDERECO' => $row['cli_endereco'],
            'CLI_BAIRRO'   => $row['cli_bairro'],
            'CLI_CIDADE'   => $row['cli_cidade'],
            'CLI_UF'       => $row['cli_uf']
        ];
    }

    $db->FecharConexao();
}
?>


<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="stylesheet" href="../../assets/global/global.css">
    <link rel="stylesheet" href="cadastro.css" />

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css"/>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <title>ERP Fácil - Clientes</title>
  </head>
  <body>
  <?php
    $codigoCliente = $_GET['codigo'] ?? '';
  ?>    
  <form action="<?php echo isset($codigoCliente) && $codigoCliente !== '' ? '../../../../backend/models/clientes/atualizar_cliente.php' :
                                                                                 '../../../../backend/models/clientes/gravar_cliente.php'; ?>" method="post">
    <div class="container">
      <div class="menu-lateral"></div>
      <main>
        <h1>Clientes</h1>

        <div class="informacoes">
          <section class="informacoes-cliente">
            <h2>Informações Pessoais</h2>
            <div class="campo">
              <label for="codigo">Código</label>
              <input type="text" id="codigo" name="codigo" value="<?php echo $cliente['CLI_CODIGO'] ?? ''; ?>" readonly/>
            </div>
            <div class="campo">
              <label for="nome">Nome</label>
              <input type="text" id="nome" name="nome" value="<?php echo $cliente['CLI_NOME'] ?? ''; ?>" required/>
            </div>
            <div class="campo">
              <label for="tipo">Tipo</label>
              <select id="tipo" name="tipo" required>
                <option value="F" <?php echo ($cliente['CLI_TIPO'] ?? '') == 'F' ? 'selected' : ''; ?>>Físico</option>
                <option value="J" <?php echo ($cliente['CLI_TIPO'] ?? '') == 'J' ? 'selected' : ''; ?>>Jurídico</option>
              </select>
            </div>
          </section>

          <section class="informacoes-contato">
            <h2>Contato</h2>
            <div class="campo">
              <label for="email">E-mail</label>
              <input type="email" id="email" name="email" value="<?php echo $cliente['CLI_EMAIL'] ?? ''; ?>" required/>
            </div>
            <div class="campo">
              <label for="telefone">Telefone</label>
              <input type="text" id="telefone" name="telefone" maxlength="15" value="<?php echo $cliente['CLI_TELEFONE'] ?? ''; ?>" required/>
            </div>
            <div class="campo">
              <label for="cpf_cnpj">CPF / CNPJ</label>
              <input type="text" id="cpf_cnpj" name="cpf_cnpj" maxlength="18" value="<?php echo $cliente['CLI_CPF_CNPJ'] ?? ''; ?>" required />
            </div>
          </section>

          <section class="informacoes-endereco">
            <h2>Endereço</h2>
            <div class="campo-esquerda">
              <label for="cep">CEP</label>
              <input type="text" id="cep" name="cep" value="<?php echo $cliente['CLI_CEP'] ?? ''; ?>" required/>
            </div>
            <div class="campo-esquerda">
              <label for="rua">Rua</label>
              <input type="text" id="rua" name="rua" value="<?php echo $cliente['CLI_ENDERECO'] ?? ''; ?>" required/>
            </div>
            <div class="campo">
              <label for="bairro">Bairro</label>
              <input type="text" id="bairro" name="bairro" value="<?php echo $cliente['CLI_BAIRRO'] ?? ''; ?>" required/>
            </div>
            <div class="campo-esquerda">
              <label for="cidade">Cidade</label>
              <input type="text" id="cidade" name="cidade" value="<?php echo $cliente['CLI_CIDADE'] ?? ''; ?>" required/>
            </div>
            <div class="campo">
              <label for="estado">Estado</label>
              <input type="text" id="estado" name="estado" value="<?php echo $cliente['CLI_UF'] ?? ''; ?>" required/>
            </div>

            <input type="submit" value="Gravar" class="btn solid"/>
            
          </section>  
        </div>
      </main>
    </div>
    </form>

    <script src="../../assets/global/global.js"></script>
    <script type="module" src="../../components/sidebar/sidebar.js"></script>
    <script src="./cadastro.js"></script>
    <script src="../../../../utils/formatacao/script.js"></script>
    <script src="../../utils/validations/script.js"></script>
  </body>
</html>