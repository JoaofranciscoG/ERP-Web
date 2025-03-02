//Pedidos, Exemplo meio porco pra facilitar o desenvolvimento e evitar repetição de linhas.
//Não é a forma correta, a forma correta seria puxando diretamente do banco de dados e exibindo os dados.

const pedidos = [
    { nome: "Teclado Mecânico RGB", numero: "02451", pagamento: "Pix", status: "Pendente", classe: "warning" },
    { nome: "Mouse Gamer 7200DPI", numero: "03678", pagamento: "Boleto", status: "Confirmado", classe: "success" },
    { nome: "Cadeira Ergonômica", numero: "05423", pagamento: "Crédito", status: "Entregue", classe: "delivered" },
    { nome: "Monitor 27' Full HD", numero: "06789", pagamento: "Débito", status: "Pendente", classe: "warning" },
    { nome: "Fone de Ouvido Bluetooth", numero: "07532", pagamento: "Pix", status: "Recusado", classe: "danger" },
    { nome: "Webcam 1080p", numero: "08947", pagamento: "Crédito", status: "Confirmado", classe: "success" },
    { nome: "SSD NVMe 1TB", numero: "09215", pagamento: "Boleto", status: "Entregue", classe: "delivered" },
    { nome: "Placa de Vídeo RTX 4060", numero: "10356", pagamento: "Crédito", status: "Pendente", classe: "warning" },
    { nome: "Processador Ryzen 7", numero: "11834", pagamento: "Pix", status: "Recusado", classe: "danger" },
    { nome: "Smartwatch Fitness", numero: "12567", pagamento: "Débito", status: "Confirmado", classe: "success" }
];

const tbody = document.getElementById("pedidos-tbody");
const mostrarTudoBtn = document.querySelector(".recent-orders a");

let mostrandoTodos = false;

function renderPedidos(limit) {
    tbody.innerHTML = ""; 
    pedidos.slice(0, limit).forEach(pedido => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${pedido.nome}</td>
            <td>${pedido.numero}</td>
            <td>${pedido.pagamento}</td>
            <td class="${pedido.classe}">${pedido.status}</td>
            <td class="primary">Detalhes</td>
        `;
        tbody.appendChild(tr);
    });
}

renderPedidos(6);

mostrarTudoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (mostrandoTodos) {
        renderPedidos(6); 
        mostrarTudoBtn.textContent = "Mostrar todos";
    } else {
        renderPedidos(pedidos.length); 
        mostrarTudoBtn.textContent = "Mostrar menos";
    }
    mostrandoTodos = !mostrandoTodos;
});