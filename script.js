document.addEventListener("DOMContentLoaded", async () => {
    const URL = "https://matildenayby.github.io/Contenedores/";

    let model, webcam;

    async function init() {
        try {
            console.log("Iniciando la aplicación...");
            if (typeof tmImage === "undefined") {
                throw new Error("Teachable Machine no está cargado correctamente");
            }

            // Cargar el modelo
            console.log("Cargando modelo desde:", URL);
            model = await tmImage.load(`${URL}model.json`, `${URL}metadata.json`);
            console.log("Modelo cargado correctamente");

            // Configurar la cámara
            webcam = new tmImage.Webcam(200, 200, true); // Ancho, alto, cámara frontal
            console.log("Inicializando la cámara...");
            await webcam.setup();
            await webcam.play();
            document.getElementById("webcam-container").appendChild(webcam.canvas);

            // Iniciar predicciones
            console.log("Iniciando predicciones...");
            predict();
        } catch (error) {
            console.error("Error durante la inicialización:", error);
        }
    }

    async function predict() {
        try {
            const prediction = await model.predict(webcam.canvas);
            console.log("Predicción:", prediction);

            // Opcional: Mostrar resultados en la página
            const output = document.getElementById("output");
            output.innerHTML = prediction.map(p => `${p.className}: ${p.probability.toFixed(2)}`).join("<br>");

            // Continuar prediciendo
            requestAnimationFrame(predict);
        } catch (error) {
            console.error("Error durante la predicción:", error);
        }
    }

    init();
});


