<?php
    class Database {
    private $connection;
    private $infos_string;

    public function __construct($database) {
        $server = 'localhost';
        $port = '5432';
        $user = 'postgres';
        $password = 'domtec@10';
        $this->infos_string = "host=$server port=$port dbname=$database user=$user password=$password";
    }

    public function AbrirConexao() {
        $this->connection = pg_connect($this->infos_string) or
        die("Não foi possível se conectar ao banco de dados");
    } 

    public function FecharConexao() {
        pg_close($this->connection) or
        die("Não foi possível fechar a conexão com o banco de dados");
    }

    public function getConnection() {
        return $this->connection;
    }
}
?>
