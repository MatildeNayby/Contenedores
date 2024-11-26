const URL = "https://matildenayby.github.io/Contenedores/";

let model, webcam;

async function init() {
    try {
        // Asegúrate de que el objeto `tmImage` esté cargado
        if (typeof tmImage === "undefined") {
            throw new Error("Teachable Machine no está cargado correctamente");
        }

        // Cargar el modelo
        model = await tmImage.load(`${URL}model.json`, `${URL}metadata.json`);
        console.log("Modelo cargado correctamente");

        // Configurar la cámara
        webcam = new tmImage.Webcam(200, 200, true); // Ancho, alto, cámara frontal
        await webcam.setup();
        await webcam.play();
        document.getElementById("webcam").appendChild(webcam.canvas);

        // Iniciar predicciones
        predict();
    } catch (error) {
        console.error("Error durante la inicialización:", error);
    }
}

async function predict() {
    try {
        const prediction = await model.predict(webcam.canvas);
        console.log(prediction);
        requestAnimationFrame(predict);
    } catch (error) {
        console.error("Error durante la predicción:", error);
    }
}

init();


