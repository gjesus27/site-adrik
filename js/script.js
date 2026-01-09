document.getElementById("formOrcamento").addEventListener("submit", function(e) {
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;
  const tipoCliente = document.getElementById("tipoCliente").value;
  const servico = document.getElementById("servico").value;
  const mensagem = document.getElementById("mensagem").value;
const cep = document.getElementById("cep").value;
const rua = document.getElementById("rua").value;
const numero = document.getElementById("numero").value;
const bairro = document.getElementById("bairro").value;
const cidade = document.getElementById("cidade").value;
const estado = document.getElementById("estado").value;
const complemento = document.getElementById("complemento").value;


 const texto = `
Olá, meu nome é ${nome}.
WhatsApp: ${telefone}

Tipo de cliente: ${tipoCliente}
Serviço: ${servico}

Endereço do serviço:
${rua}, ${numero}
Bairro: ${bairro}
Cidade: ${cidade} - ${estado}
CEP: ${cep}
Complemento: ${complemento}

Observações:
${mensagem}
`;

  const textoFormatado = encodeURIComponent(texto);
  const numeroWhatsApp = "5511977859821"; // TROCAR PELO NÚMERO DA ADRIK

  const url = `https://wa.me/${numeroWhatsApp}?text=${textoFormatado}`;
  window.open(url, "_blank");
});

const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

function toggleInfo(id) {
  const box = document.getElementById(id);
  const allBoxes = document.querySelectorAll('.info-box');

  allBoxes.forEach(item => {
    if (item !== box) {
      item.style.maxHeight = null;
    }
  });

  if (box.style.maxHeight) {
    box.style.maxHeight = null;
  } else {
    box.style.maxHeight = box.scrollHeight + "px";
  }
}

const contadores = document.querySelectorAll('.contador');
let ativado = false;

function animarContadores() {
  contadores.forEach(contador => {
    const total = +contador.getAttribute('data-numero');
    let valor = 0;
    const incremento = total / 100;

    const intervalo = setInterval(() => {
      valor += incremento;
      contador.innerText = Math.floor(valor);

      if (valor >= total) {
        contador.innerText = total;
        clearInterval(intervalo);
      }
    }, 20);
  });
}

window.addEventListener('scroll', () => {
  const section = document.querySelector('.numeros');
  const sectionTop = section.getBoundingClientRect().top;
  const screenHeight = window.innerHeight;

  if (sectionTop < screenHeight && !ativado) {
    animarContadores();
    ativado = true;
  }
});

