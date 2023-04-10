import "./style.scss";

const check = document.getElementById("check");
const button = document.getElementById("button");

check.onclick = removeInput;
button.onclick = calculaTaxa;

function removeInput() {
  const carcassBox = document.getElementById("carcass-box");

  if (check.checked) {
    carcassBox.style.display = "none";
  } else {
    carcassBox.style.display = "inline-block";
  }
}

function calculaTaxa() {
  event.preventDefault();
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
