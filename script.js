const URL = "https://matildenayby.github.io/Contenedores/";

let model, webcam;

async function init() {
    try {
        console.log("Iniciando la aplicación...");

        // Verificar si la biblioteca `tmImage` está disponible
        if (typeof tmImage === "undefined") {
            throw new Error("Teachable Machine no está cargado correctamente");
        }

        // Cargar el modelo
        console.log("Cargando modelo desde:", URL);
        model = await tmImage.load(`${URL}model.json`, `${URL}metadata.json`);
        console.log("Modelo cargado correctamente");

        // Configurar la cámara
        console.log("Inicializando la cámara...");
        webcam = new tmImage.Webcam(400, 300, true); // Ajusta el ancho y alto
        await webcam.setup();
        await webcam.play();

        // Agregar el canvas al contenedor
        const webcamContainer = document.getElementById("webcam-container");
        if (webcamContainer) {
            webcamContainer.appendChild(webcam.canvas);
        } else {
            console.error("El contenedor #webcam-container no se encuentra en el DOM.");
            return;
        }

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
        // Realizar predicciones
        const prediction = await model.predict(webcam.canvas);
        console.log("Predicción:", prediction);

        // Mostrar resultados en la página
        const output = document.getElementById("output");
        if (output) {
            output.innerHTML = prediction
                .map(p => `<strong>${p.className}:</strong> ${(p.probability * 100).toFixed(2)}%`)
                .join("<br>");
        }

        // Continuar prediciendo en cada cuadro
        requestAnimationFrame(predict);
    } catch (error) {
        console.error("Error durante la predicción:", error);

        // Mostrar mensaje de error en la página
        const output = document.getElementById("output");
        if (output) {
            output.innerHTML = `<p style="color: red;">Error durante la predicción: ${error.message}</p>`;
        }
    }
}

// Iniciar la aplicación
init();



