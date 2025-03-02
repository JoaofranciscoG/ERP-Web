document.addEventListener("DOMContentLoaded", () => {
  const themeToggler = document.querySelector(".theme-toggler");
  const body = document.body;

  themeToggler.addEventListener("click", () => {
    body.classList.toggle("dark-theme-variables");

    themeToggler.querySelectorAll("span").forEach((span) => {
      span.classList.toggle("active");
    });
  });

  const sidebarLinks = document.querySelectorAll(".sidebar-link");
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      sidebarLinks.forEach((link) => link.classList.remove("active"));
      link.classList.add("active");
    });
  });

  const menuBtn = document.getElementById("menu-btn");
  const sidebar = document.querySelector("aside");
  const closeBtn = document.getElementById("close-btn");

  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("show-sidebar");
  });

  closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("show-sidebar");
  });
});