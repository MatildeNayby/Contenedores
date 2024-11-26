model = await tmImage.load(`${"https://matildenayby.github.io/Contenedores/";}model.json`, `${"https://matildenayby.github.io/Contenedores/";}metadata.json`)
let model, webcam;

async function init() {
    model = await tmImage.load(`${URL}model.json`, `${URL}metadata.json`);
    webcam = new tmImage.Webcam(200, 200, true); // Ancho, alto, cámara
    await webcam.setup();
    await webcam.play();
    document.getElementById("webcam").appendChild(webcam.canvas);
    predict();
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    document.getElementById("output").innerText = JSON.stringify(prediction);
    requestAnimationFrame(predict);
}

init();
