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
    <div class="container">
      <div class="menu-lateral"></div>
      <main>
        <h1>Clientes</h1>

        <div class="informacoes">
          <section class="informacoes-cliente">
            <h2>Informações Pessoais</h2>
            <div class="campo">
              <label for="codigo">Código</label>
              <input type="text" id="codigo" name="codigo" />
              <!-- Passar read only -->
            </div>
            <div class="campo">
              <label for="nome">Nome</label>
              <input type="text" id="nome" name="nome" />
            </div>
            <div class="campo">
              <label for="tipo">Tipo</label>
              <select id="tipo" name="tipo">
                <option value="fisico">Físico</option>
                <option value="juridico">Jurídico</option>
              </select>
            </div>
          </section>

          <section class="informacoes-contato">
            <h2>Contato</h2>
            <div class="campo">
              <label for="email">E-mail</label>
              <input type="email" id="email" name="email" />
            </div>
            <div class="campo">
              <label for="telefone">Telefone</label>
              <input type="text" id="telefone" name="telefone" maxlength="15" />
            </div>
            <div class="campo">
              <label for="cpf-cnpj">CPF / CNPJ</label>
              <input type="text" id="cpf-cnpj" name="cpf-cnpj" maxlength="18" />
            </div>
          </section>

          <section class="informacoes-endereco">
            <h2>Endereço</h2>
            <div class="campo-esquerda">
              <label for="rua">Rua</label>
              <input type="text" id="rua" name="rua" />
            </div>
            <div class="campo">
              <label for="bairro">Bairro</label>
              <input type="text" id="bairro" name="bairro" />
            </div>
            <div class="campo-esquerda">
              <label for="cidade">Cidade</label>
              <input type="text" id="cidade" name="cidade" />
            </div>
            <div class="campo">
              <label for="estado">Estado</label>
              <input type="text" id="estado" name="estado" />
            </div>
          </section>
        </div>
      </main>
    </div>

    <script src="../../assets/global/global.js"></script>
    <script type="module" src="../../components/sidebar/sidebar.js"></script>
    <script src="./cadastro.js"></script>
    <script src="../../utils/formatacao/script.js"></script>
    <script src="../../utils/validations/script.js"></script>
  </body>
</html>
