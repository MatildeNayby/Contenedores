const URL = "https://matildenayby.github.io/Contenedores/";

let model, webcam;

async function init() {
    // Cargar el modelo
    model = await tmImage.load(`${URL}model.json`, `${URL}metadata.json`);
    console.log("Modelo cargado correctamente");

    // Configurar y mostrar la cámara
    webcam = new tmImage.Webcam(200, 200, true); // Ancho, alto, cámara frontal
    await webcam.setup();
    await webcam.play();
    document.getElementById("webcam").appendChild(webcam.canvas);

    // Iniciar predicciones
    predict();
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    console.log(prediction); // Ver resultados en la consola
    requestAnimationFrame(predict);
}

// Iniciar la aplicación
init();
