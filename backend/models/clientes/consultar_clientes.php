<?php
session_start();
include_once '../conexao.php';

header('Content-Type: application/json');

$database_empresa = $_SESSION['database_empresa'];
$db = new Database($database_empresa);
$db->AbrirConexao();
$conn = $db->getConnection();

$codigo = $_GET['codigo'] ?? '';

if ($codigo) {
    $query = "SELECT 
        CLI_CODIGO,
        CLI_NOME,
        CLI_EMAIL,
        CLI_CEP,
        CLI_TIPO,
        CLI_CPF_CNPJ,
        CLI_ENDERECO,
        CLI_BAIRRO,
        CLI_CIDADE,
        CLI_UF,
        CLI_TELEFONE
    FROM CLIENTES
    WHERE CLI_CODIGO = $1";

    $result = pg_query_params($conn, $query, [$codigo]);
} else {
    $query = "SELECT 
        CLI_CODIGO,
        CLI_NOME,
        CLI_EMAIL,
        CLI_CEP,
        CLI_TIPO,
        CLI_CPF_CNPJ,
        CLI_ENDERECO,
        CLI_BAIRRO,
        CLI_CIDADE,
        CLI_UF,
        CLI_TELEFONE
    FROM CLIENTES
    ORDER BY CLI_NOME ASC";

    $result = pg_query($conn, $query);
}

$clientes = [];

if ($result) {
    while ($row = pg_fetch_assoc($result)) {
        $clientes[] = [
            'CLI_CODIGO'   => $row['cli_codigo'],
            'CLI_NOME'     => $row['cli_nome'],
            'CLI_EMAIL'    => $row['cli_email'],
            'CLI_CEP'      => $row['cli_cep'],
            'CLI_TIPO'     => $row['cli_tipo'],
            'CLI_CPF_CNPJ' => $row['cli_cpf_cnpj'],
            'CLI_ENDERECO' => $row['cli_endereco'],
            'CLI_BAIRRO'   => $row['cli_bairro'],
            'CLI_CIDADE'   => $row['cli_cidade'],
            'CLI_UF'       => $row['cli_uf'],
            'CLI_TELEFONE' => $row['cli_telefone']
        ];
    }
}

$db->FecharConexao();
echo json_encode($clientes);


$db->FecharConexao();
?>
