import "./style.scss";

const check = document.getElementById("check-box");
const form = document.getElementById("form");
const arrowBack = document.getElementById("arrow-back");

// check.onclick = removeInput;
arrowBack.onclick = backForm;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInput();
});

function backForm() {
  document.getElementById("header").style.display = "flex";
  document.getElementById("form").style.display = "flex";
  document.getElementById("result-container").style.display = "none";
}

// function removeInput() {
//   const carcassBox = document.getElementById("carcass-box");

//   if (check.checked) {
//     carcassBox.style.display = "none";
//   } else {
//     carcassBox.style.display = "inline-block";
//   }
// }

function calculaTaxa() {
  let taxCompress = 0;

  const totalCarcass = parseFloat(document.getElementById("carcass-input").value);
  const refExtrusion = parseFloat(document.getElementById("ref-extrusion-input").value);

  const refCarcass = parseFloat(document.getElementById("ref-carcass-input").value);

  const invalidExtrusion = parseFloat(document.getElementById("invalid-extrusion-input").value);

  const resultCompress = document.getElementById("result-compress");
  const resultComplement = document.getElementById("result-complement");
  const resultTotalPipeAfterCompress = document.getElementById("result-totalPipeAfterCompress");

  if (check.checked) {
    const validCarcass = refCarcass - invalidExtrusion;
    taxCompress = 100 - 100 / (validCarcass / refExtrusion);

    const totalValidPipeAfterCompress = totalCarcass - invalidExtrusion - totalCarcass * (taxCompress / 100);

    resultCompress.innerHTML = `Compressão de ${taxCompress.toFixed(1)}% atual`;
    resultComplement.innerHTML = `*equivalente a ${((validCarcass * taxCompress) / 100).toFixed(
      1
    )} metros de tubo comprimido no momento.`;
    resultTotalPipeAfterCompress.innerHTML = `Total de tubo válido ao final do processo: ${totalValidPipeAfterCompress.toFixed(
      1
    )}m`;

    console.log(
      `Taxa de compressão de ${taxCompress.toFixed(1)}%, equivalente a ${((validCarcass * taxCompress) / 100).toFixed(
        1
      )} metros de tubo.Total de tubo valido após compressão ${totalValidPipeAfterCompress}m`
    );
  } else {
    const validCarcass = totalCarcass - refCarcass - invalidExtrusion;
    taxCompress = 100 - 100 / (validCarcass / refExtrusion);
    const totalValidPipeAfterCompress = totalCarcass - invalidExtrusion - totalCarcass * (taxCompress / 100);

    resultCompress.innerHTML = `Compressão de ${taxCompress.toFixed(1)}% atual`;
    resultComplement.innerHTML = `*equivalente a ${((validCarcass * taxCompress) / 100).toFixed(
      1
    )} metros de tubo comprimido no momento. `;
    resultTotalPipeAfterCompress.innerHTML = `Total de tubo válido ao final do processo: ${totalValidPipeAfterCompress.toFixed(
      1
    )}m`;

    console.log(
      `Taxa de compressão de ${taxCompress.toFixed(1)}%, equivalente a ${((validCarcass * taxCompress) / 100).toFixed(
        2
      )} metros de tubo. Total de tubo valido após compressão ${totalValidPipeAfterCompress}m`
    );
  }
  document.getElementById("header").style.display = "none";
  document.getElementById("form").style.display = "none";
  document.getElementById("result-container").style.display = "flex";
}

function checkInput() {
  const carcassInput = document.getElementById("carcass-input");
  const refExtrusionInput = document.getElementById("ref-extrusion-input");
  const refCarcassInput = document.getElementById("ref-carcass-input");
  const invalidExtrusionInput = document.getElementById("invalid-extrusion-input");

  const listInput = [carcassInput, refExtrusionInput, refCarcassInput, invalidExtrusionInput];

  form.style.rowGap = "0px";

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
