import "./style.scss";

const metragemTotalCarcaca = document.getElementById("carcass-footage");
const extrusaoPontoRef = document.getElementById("ref-extrusion");
const carcacaPontoRef = document.getElementById("ref-carcass");
const invalidoExtrusao = document.getElementById("invalid-extrusion");
const carcacaSentido = document.getElementById("check");
const botao = document.getElementById("button");

const form = document.querySelector("form");

console.log(metragemTotalCarcaca.innerHTML);

form.addEventListener("click", (e) => {
  if (e.target.id == "button" && !carcacaSentido.checked) {
    e.preventDefault();
  } else if (e.target.id == "button" && carcacaSentido.checked) {
    const valorCarcaca =
      parseFloat(metragemTotalCarcaca.value) -
      parseFloat(carcacaPontoRef.value) -
      parseFloat(invalidoExtrusao.value);
    const taxaCompressao =
      100 - 100 / (valorCarcaca / parseFloat(extrusaoPontoRef.value));
    console.log(taxaCompressao.toFixed(2) + "%");
  }
  function checked() {
    if (!e.target.checked && e.target.id == "check") {
      document.getElementById("carcass-box").style.display = "block";
      document.getElementById("invalid-box").style.display = "block";
    } else if (e.target.checked && e.target.id == "check") {
      document.getElementById("carcass-box").style.display = "none";
      document.getElementById("invalid-box").style.display = "none";
    }
  }
});
