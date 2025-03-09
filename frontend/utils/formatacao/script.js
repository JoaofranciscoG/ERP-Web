document.addEventListener("DOMContentLoaded", function () {
  const campoCPFCNPJ = document.getElementById("cpf-cnpj");
  const tipo = document.getElementById("tipo");

  campoCPFCNPJ.addEventListener("input", function (e) {
    e.target.value = FormatarCPFCNPJ(e.target.value, campoCPFCNPJ.maxLength);
  });

  tipo.addEventListener("change", function () {
    AjustarTamanhoCampo();
    campoCPFCNPJ.value = "";
  });

  AjustarTamanhoCampo();

  const telefone = document.getElementById("telefone");

  telefone.addEventListener("input", function (e) {
    FormatarTelefone();
  });
});

function FormatarCPFCNPJ(valor, maxLength) {
  valor = valor.replace(/\D/g, "").slice(0, maxLength);

  if (valor.length <= 11) {
    return valor
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    return valor
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
  }
}

function AjustarTamanhoCampo() {
  const campoCPFCNPJ = document.getElementById("cpf-cnpj");
  const tipo = document.getElementById("tipo");

  campoCPFCNPJ.maxLength = tipo.value === "fisico" ? 14 : 18;
}

function FormatarTelefone() {
  var telefone = document.getElementById("telefone").value;
  telefone = telefone.replace(/\D/g, "");

  if (telefone.length <= 10) {
    telefone = telefone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  } else {
    telefone = telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }

  document.getElementById("telefone").value = telefone;
}