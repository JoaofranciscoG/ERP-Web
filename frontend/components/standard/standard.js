VerificarComponentes(); // PADRÃO DE CÓDIGO QUE EU CRIEI PARA CRIAR COMPONENTES. // PARA EXEMPLO OLHAR "SIDEBAR".

function VerificarComponentes() { 
  var componente = document.querySelectorAll("componente");

  if (componente.length > 0) {
    CriarComponente(componente);
  }
}

function CriarComponente() {}
