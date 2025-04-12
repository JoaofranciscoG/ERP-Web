<?php
include_once "conexao.php";

$codigo_empresa = $_POST['codigo_empresa'];
$email          = $_POST['email'];
$senha          = $_POST['senha'];

$db = new Database();
$db->AbrirConexao();

$conn = $db->getConnection();

$sql = "SELECT USU_EMAIL, USU_SENHA, EMP_CODIGO FROM USUARIOS WHERE USU_EMAIL = $1 AND USU_SENHA = $2 AND EMP_CODIGO = $3";
$params = array($email, $senha, $codigo_empresa);

$result = pg_query_params($conn, $sql, $params);

if ($result && pg_num_rows($result) === 1) {
    $usuario = pg_fetch_assoc($result);

    session_start();
    $_SESSION['email']          = $email;
    $_SESSION['senha']          = $senha;
    $_SESSION['codigo_empresa'] = $codigo_empresa;


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
    //     window.location.href = '../../frontend/pages/dashboard/dashboard.php';
    // });
    // </script>";

    header("Location: ../../frontend/pages/login/login.php");   
}

$db->FecharConexao();
?>

