<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="stylesheet" href="../../assets/global/global.css">
    <link rel="stylesheet" href="dashboard.css"/>

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css"/>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <title>ERP Fácil - Dashboard</title>
  </head>
  <body>
    <div class="container">
      <div class="menu-lateral"></div>
      <main>
        <h1>Dashboard</h1>

        <div class="date">
          <input type="date" />
        </div>

        <div class="insights">
          <div class="sales">
            <span class="material-symbols-outlined">analytics</span>
            <div class="middle">
              <div class="left">
                <h3>Vendas totais</h3>
                <h1>R$25.497</h1>
              </div>
              <div class="progress">
                <svg>
                  <circle cx="38" cy="38" r="36"></circle>
                </svg>
                <div class="number">
                  <p>81%</p>
                </div>
              </div>
            </div>
            <small class="text-muted">Últimas 24 Horas</small>
          </div>

          <div class="expenses">
            <span class="material-symbols-outlined">bar_chart</span>
            <div class="middle">
              <div class="left">
                <h3>Despesas totais</h3>
                <h1>R$16.478</h1>
              </div>
              <div class="progress">
                <svg>
                  <circle cx="38" cy="38" r="36"></circle>
                </svg>
                <div class="number">
                  <p>62%</p>
                </div>
              </div>
            </div>
            <small class="text-muted">Últimas 24 Horas</small>
          </div>

          <div class="income">
            <span class="material-symbols-outlined">stacked_line_chart</span>
            <div class="middle">
              <div class="left">
                <h3>Renda total</h3>
                <h1>R$9.019</h1>
              </div>
              <div class="progress">
                <svg>
                  <circle cx="38" cy="38" r="36"></circle>
                </svg>
                <div class="number">
                  <p>44%</p>
                </div>
              </div>
            </div>
            <small class="text-muted">Últimas 24 Horas</small>
          </div>
        </div>

        <div class="recent-orders">
          <h2>Pedidos recentes</h2>
          <table>
            <thead>
              <tr>
                <th>Nome do Produto</th>
                <th>Número do Produto</th>
                <th>Pagamento</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody id="pedidos-tbody">
              <!-- Linhas serão geradas dinamicamente aqui via javascript -->
            </tbody>
          </table>
          <a href="#">Mostrar tudo</a>
        </div>
      </main>

      <div class="right">
        <div class="top">
          <button id="menu-btn">
            <span class="material-symbols-outlined">menu</span>
          </button>

          <div class="theme-toggler">
            <span class="material-symbols-outlined active">light_mode</span>
            <span class="material-symbols-outlined">dark_mode</span>
          </div>

          <div class="profile">
            <div class="info">
              <p>Hey, <b>Daniel</b></p>
              <small class="text-muted">Admin</small>
            </div>
            <div class="profile-photo">
              <img src="../../assets/images/profile-1.jpg" />
            </div>
          </div>
        </div>

        <div class="recent-updates">
          <h2>Updates recentes</h2>
          <div class="updates" id="updates-container">
            <!-- Updates serão adicionados dinamicamente aqui -->
          </div>
        </div>

        <div class="sales-analytics">
          <h2>Análise de Vendas</h2>
          <div class="item online">
            <div class="icon">
              <span class="material-symbols-outlined">shopping_cart</span>
            </div>
            <div class="right">
              <div class="info">
                <h3>PEDIDOS ONLINE</h3>
                <small class="text-muted">Últimas 24 horas</small>
              </div>
              <h5 class="success">+39%</h5>
              <h3>008377</h3>
            </div>
          </div>

          <div class="item offline">
            <div class="icon">
              <span class="material-symbols-outlined">local_mall</span>
            </div>
            <div class="right">
              <div class="info">
                <h3>PEDIDOS OFFLINE</h3>
                <small class="text-muted">Últimas 24 horas</small>
              </div>
              <h5 class="danger">-17%</h5>
              <h3>008378</h3>
            </div>
          </div>

          <div class="item customers">
            <div class="icon">
              <span class="material-symbols-outlined">person</span>
            </div>
            <div class="right">
              <div class="info">
                <h3>NOVOS CLIENTES</h3>
                <small class="text-muted">Últimas 24 horas</small>
              </div>
              <h5 class="success">+25%</h5>
              <h3>008379</h3>
            </div>
          </div>
          <div class="item add-product">
            <div>
              <span class="material-symbols-outlined">add</span>
              <h3>Adicionar produto</h3>
            </div>
          </div>
        </div>
      </div>
    </div>

    <script type="module" src="../../components/sidebar/sidebar.js"></script>
    <script src="../../assets/global/global.js"></script>
    <script src="dashboard.js"></script>
    <script src="../../pages/dashboard/auto/pedidos.js"></script>
    <script src="../../pages/dashboard/auto/updates.js"></script>
  </body>
</html>
