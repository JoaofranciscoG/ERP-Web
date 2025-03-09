function ValidarCPFCNPJ(valor) {
  valor = valor.replace(/\D/g, "");
  return valor.length === 11
    ? ValidarCPF(valor)
    : valor.length === 14
    ? ValidarCNPJ(valor)
    : false;
}

function ValidarCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let soma = 0,
    resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf[10]);
}

function ValidarCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, "");
  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0,
    pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  return resultado === parseInt(digitos.charAt(1));
}

function ExibirErro(input, tipo) {
  const tipoDocumento = tipo === "cpf" ? "CPF" : "CNPJ";
  Swal.fire({
    icon: "error",
    title: `${tipoDocumento} inválido`,
    text: `Digite um ${tipoDocumento} válido!`,
    allowOutsideClick: false,
    allowEscapeKey: false,
  }).then(() => {
    input.focus();
  });
}

document.getElementById("cpf-cnpj").addEventListener("blur", function () {
  const input = this;
  const valor = input.value.replace(/\D/g, "");

  if (valor.length === 11 && !ValidarCPF(valor)) {
    ExibirErro(input, "cpf");
  } else if (valor.length === 14 && !ValidarCNPJ(valor)) {
    ExibirErro(input, "cnpj");
  }
});
