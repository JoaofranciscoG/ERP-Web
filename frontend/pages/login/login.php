
<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>   

    <link rel="stylesheet" href="../../assets/global/global.css">
    <link rel="stylesheet" href="login.css"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
    
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>  
    <!--<script src="https://kit.fontawesome.com/64d58efce2.js" crossorigin="anonymous"></script>-->

    <title>Formulário de Login e Cadastro</title>
  </head>
  <body>
    <div class="container">
      <div class="forms-container">
        <div class="signin-signup">
        <form action="../../../backend/models/login.php" method="post" class="sign-in-form">
          <h2 class="title">Entrar</h2> 

          <div class="input-field">
            <i class="fas fa-building"></i>
            <input type="text" name="codigo_empresa" placeholder="Empresa" required />
          </div>

          <div class="input-field">
            <i class="fas fa-user"></i>
            <input type="email" name="email" placeholder="Email" required />
          </div>

          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input type="password" name="senha" placeholder="Senha" required />
          </div>

          <input type="submit" value="Entrar" class="btn solid" />
        </form>
        
          <form action="#" class="sign-up-form">
            <h1 style="text-align: center;">Desenvolvido por: <br> Kaléu K. de Paula e João F. Garcia</h1>
            <h3>teste</h3>
          </form>
        </div>
      </div>

      <!-- Sobre nós -->

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>Novo aqui?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button class="btn transparent" id="sign-up-btn">Sobre nós</button>
          </div>
          <img src="../../assets/images/log.svg" class="image" alt="" />
        </div>

        <div class="panel right-panel">
          <div class="content">
            <h3>Já possui uma conta?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button class="btn transparent" id="sign-in-btn">Entrar</button>
          </div>
          <img src="../../assets/images/register.svg" class="image" alt="" />
        </div>
      </div>
    </div>

    <script src="login.js"></script>
  </body>
</html>