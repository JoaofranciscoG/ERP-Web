VerificarComponentes();

function VerificarComponentes() {  //Seleciona todos os componentes com o nome/classe passado
  var componente = document.querySelectorAll("componente"); 

  if (componente.length > 0) {
    CriarComponente(componente);
  }
}

function CriarComponente(componente) {
  for (const c of componente) { //Faz um loop com os componentes
    var componente = document.createElement("componente"); //pega o componente

    componente.classList.add("componente"); //Adiciona uma classe para estilizar
    componente.innerHTML = 'Exemplo'; // Adiciona texto
    c.appendChild(componente); // Passa para a constante e cria o componente
  }
}
