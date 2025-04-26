<?php
session_start();
include_once '../conexao.php';

$database_empresa = $_SESSION['database_empresa'];
$codigo = $_GET['codigo'] ?? '';

if (!$codigo) {
    // Se não houver código, redireciona com erro
    header("Location: ../../../frontend/pages/clientes/grid/grid.php?status=erro");
    exit;
}

$db = new Database($database_empresa);
$db->AbrirConexao();

$conn = $db->getConnection();

// Prepara a query para excluir o cliente
$query = "DELETE FROM CLIENTES WHERE CLI_CODIGO = $1";
$params = [$codigo];

$result = pg_query_params($conn, $query, $params);

$db->FecharConexao();

if ($result) {
    // Se deu certo, redireciona para a grid com sucesso
    header("Location: ../../../frontend/pages/clientes/grid/grid.php?status=ok");
} else {
    // Caso ocorra um erro, redireciona para a grid com erro
    header("Location: ../../../frontend/pages/clientes/grid/grid.php?status=erro");
}

exit;
?>
