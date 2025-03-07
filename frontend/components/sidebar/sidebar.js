VerificarComponentes();
AdicionarCSS();

document.addEventListener("DOMContentLoaded", () => {
  ConfigurarCliques();
  ConfigurarResponsividade();
});

function ConfigurarCliques() {
  const sidebarLinks = document.querySelectorAll(".sidebar-link");
  const activeLink = localStorage.getItem("activeSidebarLink");

  if (activeLink) {
    sidebarLinks.forEach((link) => {
      if (link.href === activeLink) {
        link.classList.add("active");
      }
    });
  }

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      sidebarLinks.forEach((link) => link.classList.remove("active"));
      
      link.classList.add("active");
      localStorage.setItem("activeSidebarLink", link.href);
    });
  });
}

function ConfigurarResponsividade() {
  const menuBtn  = document.getElementById("menu-btn");
  const sidebar  = document.querySelector("aside");
  const closeBtn = document.getElementById("close-btn");

  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("show-sidebar");
  });

  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("show-sidebar");
  });
}

function ConfirmarLogout() {
  Swal.fire({
    title: "Tem certeza?",
    text: "Você realmente deseja sair?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sair",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Saindo...",
        text: "Aguarde enquanto finalizamos sua sessão.",
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      setTimeout(() => {
        localStorage.clear();
        window.location.href = "/frontend/pages/login/login.html";
      }, 1500);
    }
  });
}

function VerificarComponentes() {
  var asides = document.getElementsByClassName("menu-lateral");
  if (asides.length > 0) {
    CriarAside(asides);
  }
}

function CriarAside(asides) {
  for (const a of asides) {
    var aside    = document.createElement("aside");
    var divTop   = document.createElement("div");
    var divLogo  = document.createElement("div");
    var imgLogo  = document.createElement("img");
    var titulo   = document.createElement("h2");
    var divClose = document.createElement("div");
    var sidebar  = document.createElement("div");
    
    aside.classList.add("sidebar");   
    divTop.classList.add("top");
    divLogo.classList.add("logo");

    imgLogo.src = "/frontend/assets/images/logo.png";
    titulo.innerHTML = 'ERP <span class="danger">Fácil</span>';

    divLogo.appendChild(imgLogo);
    divLogo.appendChild(titulo);

    divClose.classList.add("close");
    divClose.id = "close-btn";
    divClose.innerHTML = '<span class="material-symbols-outlined">close</span>';

    divTop.appendChild(divLogo);
    divTop.appendChild(divClose);

    sidebar.classList.add("sidebar");

    var links = [
      { href: "/frontend/pages/dashboard/dashboard.html", icon: "grid_view", text: "Painel" },
      { href: "/frontend/pages/clientes/grid/grid.html", icon: "person", text: "Clientes" },
      { href: "#", icon: "receipt_long", text: "Pedidos" },
      { href: "#", icon: "insights", text: "Análise" },
      { href: "#", icon: "mail_outline", text: "Mensagens", count: 26 },
      { href: "/frontend/pages/produtos/produtos.html", icon: "inventory_2", text: "Produtos" },
      { href: "#", icon: "description", text: "Relatórios" },
      { href: "#", icon: "settings", text: "Configurações" },
      { href: "#", icon: "logout", text: "Sair" },
    ];

    links.forEach((link) => {
      var aTag = document.createElement("a");
      var icon = document.createElement("span");
      var h3 = document.createElement("h3");
      
      aTag.href = link.href;
      aTag.classList.add("sidebar-link");
   
      icon.classList.add("material-symbols-outlined");
      icon.innerText = link.icon;

      h3.innerText = link.text;

      aTag.appendChild(icon);
      aTag.appendChild(h3);

      if (link.count) {
        var spanCount = document.createElement("span");
        spanCount.classList.add("message-count");
        spanCount.innerText = link.count;
        aTag.appendChild(spanCount);
      }

      if (link.text === "Sair") {
        aTag.addEventListener("click", (event) => {
          event.preventDefault();
          ConfirmarLogout();
        });
      }

      sidebar.appendChild(aTag);
    });

    aside.appendChild(divTop);
    aside.appendChild(sidebar);
    a.appendChild(aside);
  }
}

function AdicionarCSS() {
  var style = document.createElement("style");
  style.innerHTML = `

  aside {
    height: 100vh;
    position: fixed;
  }

  aside .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1.4rem;
  }

  aside .logo {
    display: flex;
    gap: 0.8rem;
  }

  aside .logo img {
    width: 2rem;
    height: 2rem;
  }

  aside .close {
    display: none;
  }

  aside .sidebar {
    display: flex;
    flex-direction: column;
    height: 86vh;
    position: relative;
    top: 3rem;
  }

  aside h3 {
    font-weight: 500;
    margin-bottom: 10px;
  }

  aside .sidebar a {
    display: flex;
    color: var(--color-info-dark);
    margin-left: 2rem;
    gap: 1rem;
    align-items: center;
    position: relative;
    height: 3.7rem;
    transition: all 300ms ease;
  }

  aside .sidebar a span {
    font-size: 1.6rem;
  }

  aside .sidebar a:last-child {
    position: absolute;
    bottom: 2rem;
    width: 100%;
  }

  aside .sidebar a.active {
    background: var(--color-light);
    color: var(--color-primary);
    margin-left: 0;
  }

  aside .sidebar a.active:before {
    content: "";
    width: 6px;
    height: 100%;
    background: var(--color-primary);
  }

  aside .sidebar a.active span {
    color: var(--color-primary);
    margin-left: calc(1rem - 3px);
  }

  aside .sidebar a:hover {
    color: var(--color-primary);
  }

  aside .sidebar a:hover span {
    margin-left: 1rem;
    transition: all 300ms ease;
  }

  aside .sidebar .message-count {
    background: var(--color-danger);
    color: var(--color-white);
    padding: 2px 10px;
    font-size: 11px;
    border-radius: var(--border-radius-1);
  }

  aside .sidebar a.active .message-count {
    color: var(--color-white);
  }

  @media screen and (max-width: 1200px) {
    .container {
      width: 94%;
      grid-template-columns: 7rem auto 23rem;
    }

    aside .logo {
      margin-left: 25%
    }

    aside .logo h2 {
      display: none;
    }

    aside .sidebar h3 {
      display: none;
    }

    aside .sidebar a {
      width: 5.6rem;
    }

    aside .sidebar a:last-child {
      position: relative;
      margin-top: 180%;
    }
  }

  @media screen and (max-width: 768px) {
    aside {
      position: fixed;
      left: -100%;
      background: var(--color-white);
      width: 18rem;
      z-index: 3;
      height: 100vh;
      padding-right: var(--card-padding);
      display: none;
      animation: showMenu 400ms ease;
    }

    aside.show-sidebar {
      display: block;
      left: 0;
    }

    aside .logo {
      margin-left: 1rem;
    }

    aside .logo h2 {
      display: inline;
    }

    aside .sidebar h3 {
      display: inline;
    }

    aside .sidebar a {
      width: 100%;
      height: 3.4rem;
    }

    aside .sidebar a:last-child {
      position: absolute;
      bottom: 5rem;
    }

    aside .close {
      display: inline-block;
      cursor: pointer;
    }
  }`;

  document.head.appendChild(style);
}