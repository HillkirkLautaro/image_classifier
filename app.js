let model;

async function loadModel() {
  model = await mobilenet.load();
  console.log("Modelo cargado");
}

async function predictImage(imgElement) {
  const predictions = await model.classify(imgElement);
  const pred = predictions[0];
  document.getElementById('prediction').innerText =
    `Predicción: ${pred.className} (confianza: ${(pred.probability * 100).toFixed(2)}%)`;
}

document.getElementById('imageUpload').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const imgElement = document.getElementById('preview');
  imgElement.src = URL.createObjectURL(file);
  imgElement.onload = () => predictImage(imgElement);
});

loadModel();
