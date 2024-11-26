const URL = "https://matildenayby.github.io/Contenedores/";
let model, webcam;

async function init() {
    model = await tmImage.load(`${URL}model.json`, `${URL}metadata.json`);
    webcam = new tmImage.Webcam(200, 200, true); // Ancho, alto, cámara
    await webcam.setup();
    await webcam.play();
    document.getElementById("webcam").appendChild(webcam.canvas);
    predict();
}

