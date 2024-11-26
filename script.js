const URL = "https://matildenayby.github.io/Contenedores/"; // Asegúrate de que el modelo esté en el mismo directorio

let model, webcam;

async function init() {
    try {
        // Verificar que `tmImage` esté disponible
        if (typeof tmImage === "undefined") {
            throw new Error("Teachable Machine no está cargado correctamente");
        }

        // Solicitar permiso para acceder a la cámara
        await askForCameraPermission();

        // Cargar el modelo
        model = await tmImage.load(`${URL}model.json`, `${URL}metadata.json`);

        // Configurar la cámara
        webcam = new tmImage.Webcam(400, 300, true); // Ancho, alto, cámara frontal
        await webcam.setup();
        await webcam.play();

        // Mostrar el canvas de la cámara en el contenedor
        const webcamContainer = document.getElementById("webcam-container");
        if (webcamContainer && webcam.canvas) {
            // Limpiar el contenedor para evitar duplicados
            webcamContainer.innerHTML = "";
            webcamContainer.appendChild(webcam.canvas); // Agregar el canvas una vez
        } else {
            console.error("El contenedor o el canvas de la webcam no están disponibles.");
        }

        // Iniciar predicciones
        loop();
    } catch (error) {
        console.error("Error durante la inicialización:", error);
    }
}

// Función para pedir permiso al usuario
async function askForCameraPermission() {
    try {
        // Solicitar acceso a la cámara
        await navigator.mediaDevices.getUserMedia({ video: true });
    } catch (error) {
        // Si se deniega el permiso o hay un error
        throw new Error("No se pudo acceder a la cámara");
    }
}

// Función para actualizar la predicción y mostrarla en la página
async function loop() {
    try {
        // Realiza la predicción
        const prediction = await model.predict(webcam.canvas);

        // Mostrar la predicción en el HTML
        const outputElement = document.getElementById("output");
        if (outputElement && prediction.length > 0) {
            outputElement.innerHTML = prediction
                .map(p => `<strong>${p.className}:</strong> ${(p.probability * 100).toFixed(2)}%`)
                .join("<br>");
        }

        // Continuar prediciendo
        requestAnimationFrame(loop);
    } catch (error) {
        console.error("Error durante la predicción:", error);
    }
}

init();




