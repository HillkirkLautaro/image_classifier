import { translations, translateText, translateClassName } from './translations.js';

let model;
let currentLang = 'es';

async function loadModel() {
  model = await mobilenet.load();

  document.getElementById('loadingIndicator').style.display = 'none';
  document.getElementById('imageUpload').disabled = false;

  // Habilitar las imágenes de prueba
  const testImagesContainer = document.getElementById('testImagesContainer');
  testImagesContainer.style.pointerEvents = 'auto';
  testImagesContainer.style.opacity = '1';

  const testImages = document.querySelectorAll('.test-image');
  testImages.forEach(img => {
    img.addEventListener('click', () => {
      loadTestImage(img.getAttribute('data-src'));
    });
  });

  console.log("Modelo cargado");
}

async function predictImage(imgElement) {
  const predictions = await model.classify(imgElement);
  const pred = predictions[0];

  const className = translateClassName(currentLang, pred.className);

  document.getElementById('prediction').innerText =
    `${translateText(currentLang, 'predictionPrefix')}${className} (${translateText(currentLang, 'confidence')}: ${(pred.probability * 100).toFixed(2)}%)`;
}

function updateStaticTexts() {
  document.querySelector('h1').innerText = translateText(currentLang, 'title');
  const label = document.querySelector('label[for="imageUpload"]');
  if(label) label.innerText = translateText(currentLang, 'label');
  document.getElementById('prediction').innerText = translateText(currentLang, 'waiting');
}

function setLanguage(lang) {
  currentLang = lang;
  updateStaticTexts();
}

document.getElementById('imageUpload').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const imgElement = document.getElementById('preview');
  imgElement.src = URL.createObjectURL(file);
  imgElement.onload = () => predictImage(imgElement);
});

// Función para cargar una imagen de prueba
function loadTestImage(src) {
  const imgElement = document.getElementById('preview');
  imgElement.src = src;
  imgElement.style.display = 'block'; // Mostrar la imagen
  imgElement.onload = () => {
    predictImage(imgElement);
    // Desplazarse suavemente al visor principal
    imgElement.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Manejar errores
  imgElement.onerror = () => {
    console.error('Error al cargar la imagen:', src);
    document.getElementById('prediction').textContent = 'Error al cargar la imagen de prueba';
  };
}

loadModel();
updateStaticTexts();
