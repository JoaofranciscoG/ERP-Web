import AdicionarCSS from "./style.js";

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
  const menuBtn = document.getElementById("menu-btn");
  const sidebar = document.querySelector("aside");
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
        window.location.href = "../../pages/login/login.php";
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
    var aside = document.createElement("aside");
    var divTop = document.createElement("div");
    var divLogo = document.createElement("div");
    var imgLogo = document.createElement("img");
    var titulo = document.createElement("h2");
    var divClose = document.createElement("div");
    var sidebar = document.createElement("div");

    aside.classList.add("sidebar");
    divTop.classList.add("top");
    divLogo.classList.add("logo");

    imgLogo.src = "../../assets/images/logo.png";
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
      {
        href: "../../pages/dashboard/dashboard.php",
        icon: "grid_view",
        text: "Painel",
      },
      {
        href: "../../pages/clientes/grid/grid.php",
        icon: "person",
        text: "Clientes",
      },
      { href: "#", icon: "receipt_long", text: "Pedidos" },
      { href: "#", icon: "insights", text: "Análise" },
      { href: "#", icon: "mail_outline", text: "Mensagens", count: 26 },
      {
        href: "../../pages/produtos/produtos.php",
        icon: "inventory_2",
        text: "Produtos",
      },
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
