document.addEventListener("DOMContentLoaded", () => {
  const themeToggler = document.querySelector(".theme-toggler");
  const body = document.body;

  themeToggler.addEventListener("click", () => {
    body.classList.toggle("dark-theme-variables");

    themeToggler.querySelectorAll("span").forEach((span) => {
      span.classList.toggle("active");
    });
  });
});