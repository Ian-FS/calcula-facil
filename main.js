import "./style.scss";

const metragemTotalCarcaca = document.getElementById("carcass-footage");
const extrusaoPontoRef = document.getElementById("ref-extrusion");
const carcacaPontoRef = document.getElementById("ref-carcass");
const invalidoExtrusao = document.getElementById("invalid-extrusion");
const carcacaSentido = document.getElementById("check");
const botao = document.getElementById("button");

const form = document.querySelector("form");

console.log(metragemTotalCarcaca.innerHTML);

botao.addEventListener("click", (e) => {
  e.preventDefault();

  if (!carcacaSentido.checked) {
    const valorCarcaca =
      parseFloat(metragemTotalCarcaca.value) -
      parseFloat(carcacaPontoRef.value) -
      parseFloat(invalidoExtrusao.value);
    const taxaCompressao =
      100 - 100 / (valorCarcaca / parseFloat(extrusaoPontoRef.value));
    console.log(taxaCompressao.toFixed(2) + "%");
  } else {
    metragemTotalCarcaca.style.display = "none";
    invalidoExtrusao.style.display = "none";

    const prodIdeal = parseFloat(carcacaPontoRef.value);
    const prodReal = parseFloat(extrusaoPontoRef.value);

    const taxaCompressao = 100 * (prodIdeal / prodReal);

    console.log(taxaCompressao.toFixed(2) + "%");
  }
});
