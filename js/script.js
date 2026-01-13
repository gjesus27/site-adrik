/* =========================
   FORMULÁRIO → WHATSAPP
========================= */
document.getElementById("formOrcamento").addEventListener("submit", function (e) {
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

  const enderecoMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${rua} ${numero}, ${bairro}, ${cidade} - ${estado}`
  )}`;

  const texto = `
Olá, meu nome é ${nome}.
WhatsApp: ${telefone}

Tipo de cliente: ${tipoCliente}
Serviço solicitado: ${servico}

Endereço do serviço:
${rua}, ${numero}
${bairro} - ${cidade}/${estado}
CEP: ${cep}
${complemento ? "Complemento: " + complemento : ""}

Localização no mapa:
${enderecoMaps}

Observações:
${mensagem}
  `;

  const numeroWhatsApp = "5511977859821";
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

  window.open(url, "_blank");
});


/* =========================
   MENU MOBILE
========================= */
const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".nav");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}


/* =========================
   INFO BOX (LUMINOL, ETC)
========================= */
function toggleInfo(id) {
  const box = document.getElementById(id);
  const allBoxes = document.querySelectorAll(".info-box");

  allBoxes.forEach(item => {
    if (item !== box) item.style.maxHeight = null;
  });

  box.style.maxHeight
    ? (box.style.maxHeight = null)
    : (box.style.maxHeight = box.scrollHeight + "px");
}


/* =========================
   CONTADORES ANIMADOS (FIX)
========================= */
const contadores = document.querySelectorAll(".contador");
let animou = false;

function animarContadores() {
  const section = document.querySelector(".numeros");
  if (!section) return;

  const sectionTop = section.getBoundingClientRect().top;
  const screenPosition = window.innerHeight * 0.85;

  if (sectionTop < screenPosition && !animou) {
    contadores.forEach(contador => {
      const alvo = Number(contador.dataset.target);
      let atual = 0;
      const incremento = Math.ceil(alvo / 80);

      const timer = setInterval(() => {
        atual += incremento;

        if (atual >= alvo) {
          contador.innerText = `+ de ${alvo}`;
          clearInterval(timer);
        } else {
          contador.innerText = `+ de ${atual}`;
        }
      }, 30);
    });

    animou = true;
  }
}

window.addEventListener("scroll", animarContadores);

/* =========================
   CEP AUTOMÁTICO (ViaCEP)
========================= */
const cepInput = document.getElementById("cep");

cepInput.addEventListener("input", () => {
  let cep = cepInput.value.replace(/\D/g, "");

  // máscara 00000-000
  if (cep.length > 5) {
    cepInput.value = cep.replace(/^(\d{5})(\d)/, "$1-$2");
  } else {
    cepInput.value = cep;
  }

  // busca automática ao completar 8 dígitos
  if (cep.length === 8) {
    buscarCEP(cep);
  }
});

function buscarCEP(cep) {
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(data => {
      if (data.erro) return;

      document.getElementById("rua").value = data.logradouro || "";
      document.getElementById("bairro").value = data.bairro || "";
      document.getElementById("cidade").value = data.localidade || "";
      document.getElementById("estado").value = data.uf || "";
    })
    .catch(() => {
      console.log("Erro ao buscar CEP");
    });
}

