const URL = "https://matildenayby.github.io/Contenedores/"; // URL donde está alojado tu modelo

let model, webcam;

async function init() {
    try {
        console.log("Iniciando la aplicación...");

        // Verificar si tmImage está disponible
        if (typeof tmImage === "undefined") {
            throw new Error("Teachable Machine no está cargado correctamente");
        }

        // Cargar el modelo
        console.log("Cargando modelo desde:", URL);
        model = await tmImage.load(`${URL}model.json`, `${URL}metadata.json`);
        console.log("Modelo cargado correctamente");

        // Configurar la cámara
        webcam = new tmImage.Webcam(400, 300, true); // Ancho, alto, cámara frontal
        await webcam.setup();
        await webcam.play();

        // Esperar un segundo antes de agregar el canvas al DOM
        setTimeout(() => {
            const webcamElement = document.getElementById("webcam-container"); // Asegúrate de que el ID sea correcto
            if (webcam.canvas) {
                webcamElement.appendChild(webcam.canvas); // Agregar el canvas al contenedor correcto

                // Asegúrate de que la cámara esté capturando imágenes cada segundo
                setInterval(() => {
                    console.log("Capturando imagen...");
                    webcam.update(); // Actualiza el contenido del canvas
                }, 1000);
            } else {
                console.error("El canvas de la webcam no está disponible.");
            }
        }, 1000);

        // Iniciar predicciones
        console.log("Iniciando predicciones...");
        predict();
    } catch (error) {
        console.error("Error durante la inicialización:", error);

        // Mostrar mensaje de error en la página
        const output = document.getElementById("output");
        if (output) {
            output.innerHTML = `<p style="color: red;">Error durante la inicialización: ${error.message}</p>`;
        }
    }
}

async function predict() {
    try {
        // Realizar la predicción
        const prediction = await model.predict(webcam.canvas);
        console.log("Predicción:", prediction);

        // Mostrar las predicciones en el HTML
        const output = document.getElementById("output");
        if (output) {
            output.innerHTML = prediction
                .map(p => `<strong>${p.className}:</strong> ${(p.probability * 100).toFixed(2)}%`)
                .join("<br>");
        }

        // Continuar prediciendo
        requestAnimationFrame(predict);
    } catch (error) {
        console.error("Error durante la predicción:", error);

        // Mostrar mensaje de error en el HTML
        const output = document.getElementById("output");
        if (output) {
            output.innerHTML = `<p style="color: red;">Error durante la predicción: ${error.message}</p>`;
        }
    }
}

// Iniciar la aplicación
init();

