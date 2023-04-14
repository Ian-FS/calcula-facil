import "./style.scss";

const check = document.getElementById("check-box");
const form = document.getElementById("form");

check.onclick = removeInput;
form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInput();
});

function removeInput() {
  const carcassBox = document.getElementById("carcass-box");

  if (check.checked) {
    carcassBox.style.display = "none";
  } else {
    carcassBox.style.display = "inline-block";
  }
}

function calculaTaxa() {
  let taxaCompress = 0;

  const totalCarcass = parseFloat(document.getElementById("carcass-input").value);
  const refExtrusion = parseFloat(document.getElementById("ref-extrusion-input").value);

  const refCarcass = parseFloat(document.getElementById("ref-carcass-input").value);

  const invalidExtrusion = parseFloat(document.getElementById("invalid-extrusion-input").value);

  if (check.checked) {
    const validCarcass = refCarcass - invalidExtrusion;
    taxaCompress = 100 - 100 / (validCarcass / refExtrusion);
    console.log(
      `Taxa de compressão de ${taxaCompress.toFixed(1)}%, equivalente a ${((validCarcass * taxaCompress) / 100).toFixed(
        1
      )} metros de tubo.`
    );
  } else {
    const validCarcass = totalCarcass - refCarcass - invalidExtrusion;
    taxaCompress = 100 - 100 / (validCarcass / refExtrusion);
    console.log(
      `Taxa de compressão de ${taxaCompress.toFixed(1)}%, equivalente a ${((validCarcass * taxaCompress) / 100).toFixed(
        2
      )} metros de tubo.`
    );
  }
}

function checkInput() {
  const carcassInput = document.getElementById("carcass-input");
  const refExtrusionInput = document.getElementById("ref-extrusion-input");
  const refCarcassInput = document.getElementById("ref-carcass-input");
  const invalidExtrusionInput = document.getElementById("invalid-extrusion-input");

  const listInput = [carcassInput, refExtrusionInput, refCarcassInput, invalidExtrusionInput];

  if (carcassInput.value === "" && !check.checked) {
    setError(carcassInput, "Metragem total da Carcaça necessária");
  }
  if (refExtrusionInput.value === "") {
    setError(refExtrusionInput, "Metragem de referência da camada de extrusão necessária");
  }
  if (refCarcassInput.value === "") {
    setError(refCarcassInput, "Metragem de referência da carcaça necessária");
  }
  if (invalidExtrusionInput.value === "") {
    setError(invalidExtrusionInput, "Metragem inválida da extrusão necessária");
  } else {
    calculaTaxa();
    setSucess(listInput);
  }
}
function setSucess(listInput) {
  listInput.forEach((input) => {
    input.value = "";
    input.parentNode.className = "form-control";
    input.parentNode.children[4].style.visibility = "hidden";
    input.parentNode.children[4].style.position = "absolute";
  });
}
function setError(input, message) {
  input.parentNode.className = "form-control error";
  input.parentNode.children[4].style.visibility = "visible";
  input.parentNode.children[4].style.position = "relative";
  input.parentNode.children[4].innerHTML = message;
}
