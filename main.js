import "./style.scss";

const check = document.getElementById("check");
const button = document.getElementById("button");

check.onclick = removeInput;
button.addEventListener("click", (e) => {
  checkInput(e);
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

  const totalCarcass = parseFloat(
    document.getElementById("carcass-footage").value
  );
  const refExtrusion = parseFloat(
    document.getElementById("ref-extrusion").value
  );

  const refCarcass = parseFloat(document.getElementById("ref-carcass").value);

  const invalidExtrusion = parseFloat(
    document.getElementById("invalid-extrusion").value
  );

  if (check.checked) {
    const validCarcass = refCarcass - invalidExtrusion;
    taxaCompress = 100 - 100 / (validCarcass / refExtrusion);
    console.log(
      `Taxa de compressão de ${taxaCompress.toFixed(1)}%, equivalente a ${(
        (validCarcass * taxaCompress) /
        100
      ).toFixed(1)} metros de tubo.`
    );
  } else {
    const validCarcass = totalCarcass - refCarcass - invalidExtrusion;
    taxaCompress = 100 - 100 / (validCarcass / refExtrusion);
    console.log(
      `Taxa de compressão de ${taxaCompress.toFixed(1)}%, equivalente a ${(
        (validCarcass * taxaCompress) /
        100
      ).toFixed(2)} metros de tubo.`
    );
  }
}
function checkInput(ev) {
  ev.preventDefault();
  if (check.checked) {
  }
  let i;
  for (let i = 1; i < 5; i++) {
    if (ev.target.parentNode[i].value === "") {
      setError();
    }
  }
  // checkParent(i)
  calculaTaxa();
}

function setError(e) {
  console.log("faltou preencher");
}
function checkParent(i) {
  if (check.checked) {
    return (i = 2);
  } else {
    return (i = 1);
  }
}
