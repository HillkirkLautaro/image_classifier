export const translations = {
    es: {
      title: "Clasificador de Imágenes",
      label: "Seleccioná una imagen",
      waiting: "Esperando imagen...",
      predictionPrefix: "Predicción: ",
      confidence: "confianza",
      translateMap: {
        "tabby cat": "gato atigrado",
        "Siamese cat": "gato siamés",
        "Persian cat": "gato persa",
        "tiger": "tigre",
        "dog": "perro",
      }
    },
    en: {
      title: "Image Classifier",
      label: "Select an image",
      waiting: "Waiting for image...",
      predictionPrefix: "Prediction: ",
      confidence: "confidence",
      translateMap: {}
    }
  };
  
  export function translateText(lang, key) {
    return translations[lang]?.[key] || key;
  }
  
  export function translateClassName(lang, className) {
    if(lang === 'es') {
      return translations.es.translateMap[className] || className;
    }
    return className;
  }
  