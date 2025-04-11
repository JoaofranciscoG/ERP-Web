const updates = [
  {
    foto: "../../assets/images/profile-2.jpg",
    nome: "Mike Tyson",
    mensagem: "recebeu seu pedido",
    tempo: "2 Minutos atrás",
  },
  {
    foto: "../../assets/images/profile-3.jpg",
    nome: "Mike Tyson",
    mensagem: "recebeu seu pedido",
    tempo: "2 Minutos atrás",
  },
  {
    foto: "../../assets/images/profile-4.jpg",
    nome: "Mike Tyson",
    mensagem: "recebeu seu pedido",
    tempo: "2 Minutos atrás",
  },
];

const container = document.getElementById("updates-container");

updates.forEach((update) => {
  const div = document.createElement("div");
  div.classList.add("update");
  div.innerHTML = `
        <div class="profile-photo">
            <img src="${update.foto}">
        </div>
        <div class="message">
            <p><b>${update.nome}</b> ${update.mensagem}</p>
            <small class="text-muted">${update.tempo}</small>
        </div>
    `;
  container.appendChild(div);
});
