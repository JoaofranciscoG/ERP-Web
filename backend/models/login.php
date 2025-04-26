<?php
session_start();
include_once "conexao.php";

$database_empresa = $_POST['database_empresa'];
$email            = $_POST['email'];
$senha            = $_POST['senha'];

$db = new Database($database_empresa);
$db->AbrirConexao();

$conn = $db->getConnection();

$sql = "SELECT USU_EMAIL FROM USUARIOS WHERE USU_EMAIL = $1 AND USU_SENHA = $2";
$params = array($email, $senha);

$result = pg_query_params($conn, $sql, $params);

if ($result && pg_num_rows($result) === 1) {
    $usuario = pg_fetch_assoc($result);

    session_start();
    $_SESSION['email']            = $email;
    $_SESSION['senha']            = $senha;
    $_SESSION['database_empresa'] = $database_empresa;


    // echo "<script>
    // Swal.fire({
    //     icon: 'success',
    //     title: 'Login bem-sucedido!',
    //     text: 'Redirecionando...',
    //     timer: 2000,
    //     showConfirmButton: false
    // }).then(() => {
    //     window.location.href = '../../frontend/pages/dashboard/dashboard.php';
    // });
    // </script>";

    header("Location: ../../frontend/pages/dashboard/dashboard.php");
} else {

    // echo "<script>
    // Swal.fire({
    //     icon: 'success',
    //     title: 'Login bem-sucedido!',
    //     text: 'Redirecionando...',
    //     timer: 2000,
    //     showConfirmButton: false
    // }).then(() => {
    //     window.location.href = '../../frontend/pages/login/login.php';
    // });
    // </script>";
    
    header("Location: ../../frontend/pages/login/login.php");   
}

$db->FecharConexao();
?>

