let modelo = null;

// Cargar el modelo de manera asíncrona
async function cargarModelo() {
  try {
    modelo = await tf.loadLayersModel('js/model.json');
    console.log("Modelo cargado exitosamente");
  } catch (error) {
    console.error("Error al cargar el modelo:", error);
    document.getElementById("resultado").innerText = "Error al cargar el modelo. Intente nuevamente.";
  }
}

// Función para procesar la imagen y predecir
async function predecirImagen(imageElement, imageDataURL) {
  let tensor;

  try {
    tensor = tf.browser.fromPixels(imageElement)
      .resizeNearestNeighbor([100, 100])
      .mean(2)
      .expandDims(2)
      .expandDims()
      .toFloat()
      .div(tf.scalar(255.0));

    const prediction = await modelo.predict(tensor).data();
    const categorias = ["Bengala", "Bombay", "Cartujo", "Esfinge", "Mainecoo", "Persa", "Siamés"];
    const indexMax = prediction.indexOf(Math.max(...prediction));
    const resultado = categorias[indexMax];
    
    localStorage.setItem('imagenSeleccionada', imageDataURL);
    localStorage.setItem('prediccion', resultado);
    
    window.location.href = 'resultado.html';
    
  } catch (error) {
    console.error("Error durante la predicción:", error);
    document.getElementById("resultado").innerText = "Error durante la predicción. Intente nuevamente.";
  }
}

// Función para manejar la selección de archivo
function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        predecirImagen(img, e.target.result);
      };
    };
    reader.readAsDataURL(file);
  }
}

document.getElementById('pickImage').addEventListener('click', function() {
  document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', handleFileChange);

window.onload = async () => {
  await cargarModelo();
};
