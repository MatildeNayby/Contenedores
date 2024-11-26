 const URL = "https://matildenayby.github.io/Contenedores/"; // Asegúrate de que el modelo esté en el mismo directorio

let model, webcam;

async function init() {
    try {
        // Verifica que tmImage esté disponible
        if (typeof tmImage === "undefined") {
            throw new Error("Teachable Machine no está cargado correctamente");
        }

        // Solicitar permiso para acceder a la cámara
        await askForCameraPermission();

        // Cargar el modelo
        model = await tmImage.load(`${URL}model.json`, `${URL}metadata.json`);

        // Configurar la cámara
        webcam = new tmImage.Webcam(200, 200, true); // Ancho, alto, cámara frontal
        await webcam.setup();
        await webcam.play();

        setTimeout(() => {
            const webcamElement = document.getElementById("output");
            if (webcam.canvas) {
                webcamElement.appendChild(webcam.canvas);
        
                // Asegúrate de que la cámara esté capturando imágenes cada segundo
                setInterval(() => {
                    console.log("Capturando imagen...");
                    webcam.update(); // Actualiza el contenido del canvas
                }, 1000);
            } else {
                console.error("El canvas de la webcam no está disponible.");
            }
        }, 1000);

        // Mostrar el video en el DOM
        const webcamElement = document.getElementById("webcam");
        if (webcam.canvas) {
            webcam.canvas.style.border = "2px solid red";
            webcamElement.appendChild(webcam.canvas);
        } else {
            console.error("El canvas de la webcam no está disponible.");
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
        
        // Aquí se muestra la predicción en el HTML
        const predictionElement = document.getElementById("prediction");

        // Si no se recibe ninguna predicción, mostramos un mensaje genérico
        if (prediction && prediction.length > 0) {
            // Encontrar la predicción con la probabilidad más alta
            const highestPrediction = prediction.reduce((max, current) => {
                return current.probability > max.probability ? current : max;
            });

            // Mostrar la clase y la probabilidad de la predicción más alta
            predictionElement.innerHTML = `Predicción: ${highestPrediction.className} con probabilidad: ${highestPrediction.probability.toFixed(2)}`;
        } else {
            predictionElement.innerHTML = "Predicción: Ninguna";
        }

        // Llama a la función loop para la siguiente predicción
        requestAnimationFrame(loop);
    } catch (error) {
        console.error("Error durante la predicción:", error);
    }
}


init();

