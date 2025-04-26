<?php
session_start();
include_once '../conexao.php';

$database_empresa = $_SESSION['database_empresa'];
$codigo    = $_POST['codigo']     ?? '';
$nome      = $_POST['nome']       ?? '';
$dataInput = date('Y-m-d');
$telefone  = $_POST['telefone']   ?? '';
$email     = $_POST['email']      ?? '';
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

$query = "INSERT INTO CLIENTES (
    CLI_NOME,
    CLI_DI,
    CLI_EMAIL,
    CLI_TIPO,
    CLI_CPF_CNPJ,
    CLI_CEP,
    CLI_ENDERECO,
    CLI_BAIRRO,
    CLI_CIDADE,
    CLI_UF,
    CLI_TELEFONE
) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
)";

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
    $telefone   
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
