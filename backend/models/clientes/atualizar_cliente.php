<?php
session_start();
include_once '../conexao.php';

$database_empresa = $_SESSION['database_empresa'];
$codigo    = $_POST['codigo']     ?? '';
$nome      = $_POST['nome']       ?? '';
$dataInput = date('Y-m-d');
$email     = $_POST['email']      ?? '';
$telefone  = $_POST['telefone']   ?? '';
$tipo      = $_POST['tipo']       ?? '';
$cpf_cnpj  = $_POST['cpf_cnpj']   ?? '';
$cep       = $_POST['cep']        ?? '';
$endereco  = $_POST['rua']        ?? '';
$bairro    = $_POST['bairro']     ?? '';
$cidade    = $_POST['cidade']     ?? '';
$uf        = $_POST['estado']     ?? '';

$db = new Database($database_empresa);
$db->AbrirConexao();

$conn = $db->getConnection();

$query = "UPDATE CLIENTES SET
    CLI_NOME      = $1,
    CLI_DI        = $2,
    CLI_EMAIL     = $3,
    CLI_TIPO      = $4,
    CLI_CPF_CNPJ  = $5,
    CLI_CEP       = $6,
    CLI_ENDERECO  = $7,
    CLI_BAIRRO    = $8,
    CLI_CIDADE    = $9,
    CLI_UF        = $10,
    CLI_TELEFONE  = $11
WHERE CLI_CODIGO  = $12";

$params = [
    $nome,
    $dataInput === '' ? null : $dataInput,
    $email,
    $tipo,
    $cpf_cnpj,
    $cep,
    $endereco,
    $bairro,
    $cidade,
    $uf,
    $telefone,
    $codigo
];

$result = pg_query_params($conn, $query, $params);

$db->FecharConexao();

if ($result) {
    header("Location: ../../../frontend/pages/clientes/grid/grid.php?status=ok");
    exit;
} else {
    header("Location: ../../../frontend/pages/clientes/cadastro/cadastro_cliente.php?status=erro");
    exit;
}
?>
