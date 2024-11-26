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

setTimeout(() => {
    const webcamElement = document.getElementById("webcam");
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


