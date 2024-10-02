window.onload = function() {
    // Recuperar los datos de localStorage
    const imageDataURL = localStorage.getItem('imagenSeleccionada');
    const prediccion = localStorage.getItem('prediccion');

    // Mostrar los resultados
    if (imageDataURL && prediccion) {
        document.getElementById('resultadoImagen').src = imageDataURL;
        document.getElementById('resultadoPrediccion').innerText = `Raza: ${prediccion}`;

        const predmin = prediccion.toLowerCase();

        // Mostrar el rectángulo si la predicción es "bombay"
        if (predmin === "bengala") {
            document.getElementById('rectangulo1').style.display = 'block';
        }
        if (predmin === "bombay") {
            document.getElementById('rectangulo2').style.display = 'block';
        }
        if (predmin === "cartujo") {
            document.getElementById('rectangulo3').style.display = 'block';
        }
        if (predmin === "esfinge") {
            document.getElementById('rectangulo4').style.display = 'block';
        }
        if (predmin === "mainecoo") {
            document.getElementById('rectangulo5').style.display = 'block';
        }
        if (predmin === "persa") {
            document.getElementById('rectangulo6').style.display = 'block';
        }
        if (predmin === "siamés") {
            document.getElementById('rectangulo7').style.display = 'block';
        }
    } else {
        document.getElementById('resultadoPrediccion').innerText = "No se encontraron datos.";
    }

    // Limpiar el localStorage después de cargar los datos
    localStorage.removeItem('imagenSeleccionada');
    localStorage.removeItem('prediccion');
};
