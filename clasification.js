const URL = "https://matildenayby.github.io/Contenedores/"; // Asegúrate de que el modelo esté en el mismo directorio

let model, webcam;

async function init() {
    try {
        if (typeof tmImage === "undefined") {
            throw new Error("Teachable Machine no está cargado correctamente");
        }

        await askForCameraPermission();

        model = await tmImage.load(`${URL}model.json`, `${URL}metadata.json`);

        webcam = new tmImage.Webcam(200, 200, true);
        await webcam.setup();
        await webcam.play();

        setTimeout(() => {
            const webcamElement = document.getElementById("webcam-container");
            if (webcam.canvas) {
                webcamElement.appendChild(webcam.canvas);
        
                setInterval(() => {
                    console.log("Capturando imagen...");
                    webcam.update();
                }, 200);
            } else {
                console.error("El canvas de la webcam no está disponible.");
            }
        }, 1000);

        const webcamElement = document.getElementById("webcam-container");
        if (webcam.canvas) {
            webcamElement.appendChild(webcam.canvas);
            webcamElement.style.width = `${webcam.canvas.width}px`;
            webcamElement.style.height = `${webcam.canvas.height}px`;
        } else {
            console.error("El canvas de la webcam no está disponible.");
        }

        loop();
    } catch (error) {
        console.error("Error durante la inicialización:", error);
    }
}

async function askForCameraPermission() {
    try {
        await navigator.mediaDevices.getUserMedia({ video: true });
    } catch (error) {
        throw new Error("No se pudo acceder a la cámara");
    }
}

async function loop() {
    try {
        const prediction = await model.predict(webcam.canvas);
        const predictionElement = document.getElementById("prediction");

        if (prediction && prediction.length > 0) {
            const highestPrediction = prediction.reduce((max, current) => {
                return current.probability > max.probability ? current : max;
            });

            predictionElement.innerHTML = `Predicción: ${highestPrediction.className} con probabilidad: ${highestPrediction.probability.toFixed(2) * 100}%`;

            // Llamada a la función que actualiza la sección de información
            updateInfoSection(highestPrediction.className);
        } else {
            predictionElement.innerHTML = "Predicción: Ninguna";
        }

        requestAnimationFrame(loop);
    } catch (error) {
        console.error("Error durante la predicción:", error);
    }
}

// Función para actualizar la sección de información dinámica
function updateInfoSection(predictionClass) {
    const infoSection = document.getElementById("info-section");

    // Limpia la información anterior
    infoSection.innerHTML = "";

    // Crea el contenido dependiendo de la clase predicha
    let content = "";

    // Definir el color de fondo según la categoría predicha
    let color = "#e0f7fa"; // Color por defecto (un azul claro)
    switch (predictionClass) {
        case "organico":
            color = "#a5d6a7"; // Verde suave
            content = `
                <div style="display: flex; align-items: center; padding: 20px; background-color: ${color}; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <div style="flex: 1; text-align: center;">
                        <h2 style="font-family: 'Georgia', serif; color: #333; margin-bottom: 10px;">Receta para Composta</h2>
                        <p style="font-family: 'Comic Sans MS', cursive; font-size: 1.1rem; color: #444;">
                            La composta es una excelente manera de reciclar residuos orgánicos.
                        </p>
                    </div>
                    <div style="flex: 2; padding-left: 20px;">
                        <ul style="list-style-type: none; padding-left: 0; font-family: 'Arial', sans-serif;">
                            <li style="margin-bottom: 10px; display: flex; align-items: center;">
                                <span style="margin-right: 10px;">➡️</span> Residuos de frutas y verduras
                            </li>
                            <li style="margin-bottom: 10px; display: flex; align-items: center;">
                                <span style="margin-right: 10px;">➡️</span> Hojas secas y césped
                            </li>
                            <li style="margin-bottom: 10px; display: flex; align-items: center;">
                                <span style="margin-right: 10px;">➡️</span> Posos de café
                            </li>
                            <li style="margin-bottom: 10px; display: flex; align-items: center;">
                                <span style="margin-right: 10px;">➡️</span> Añade un poco de tierra para activar el proceso
                            </li>
                        </ul>
                    </div>
                </div>
            `;
            break;
        case "aluminio":
            color = "#ffcc80"; // Naranja suave
            content = `
                <div style="display: flex; align-items: center; padding: 20px; background-color: ${color}; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <div style="flex: 1; text-align: center;">
                        <h2 style="font-family: 'Georgia', serif; color: #333; margin-bottom: 10px;">Reciclaje de Aluminio</h2>
                        <p style="font-family: 'Comic Sans MS', cursive; font-size: 1.1rem; color: #444;">
                            El aluminio es 100% reciclable y se puede reciclar infinitamente sin perder calidad.
                        </p>
                    </div>
                    <div style="flex: 2; padding-left: 20px;">
                        <ul style="list-style-type: none; padding-left: 0; font-family: 'Arial', sans-serif;">
                            <li style="margin-bottom: 10px; display: flex; align-items: center;">
                                <span style="margin-right: 10px;">➡️</span> Recoge latas y productos de aluminio
                            </li>
                            <li style="margin-bottom: 10px; display: flex; align-items: center;">
                                <span style="margin-right: 10px;">➡️</span> Enjuágalos bien antes de reciclar
                            </li>
                            <li style="margin-bottom: 10px; display: flex; align-items: center;">
                                <span style="margin-right: 10px;">➡️</span> Depósitalos en el contenedor adecuado
                            </li>
                        </ul>
                    </div>
                </div>
            `;
            break;
        case "inorganico":
            color = "#90caf9"; // Azul suave
            content = `
                <div style="display: flex; align-items: center; padding: 20px; background-color: ${color}; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <div style="flex: 1; text-align: center;">
                        <h2 style="font-family: 'Georgia', serif; color: #333; margin-bottom: 10px;">Materiales Inorgánicos</h2>
                        <p style="font-family: 'Comic Sans MS', cursive; font-size: 1.1rem; color: #444;">
                            Los materiales inorgánicos incluyen vidrio, metal y otros elementos no biodegradables.
                        </p>
                    </div>
                    <div style="flex: 2; padding-left: 20px;">
                        <ul style="list-style-type: none; padding-left: 0; font-family: 'Arial', sans-serif;">
                            <li style="margin-bottom: 10px; display: flex; align-items: center;">
                                <span style="margin-right: 10px;">➡️</span> Sepáralos adecuadamente
                            </li>
                            <li style="margin-bottom: 10px; display: flex; align-items: center;">
                                <span style="margin-right: 10px;">➡️</span> Facilita su reciclaje
                            </li>
                        </ul>
                    </div>
                </div>
            `;
            break;
        case "plastico":
            color = "#f48fb1"; // Rosa suave
            content = `
                <div style="display: flex; align-items: center; padding: 20px; background-color: ${color}; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    <div style="flex: 1; text-align: center;">
                        <h2 style="font-family: 'Georgia', serif; color: #333; margin-bottom: 10px;">Reciclaje de Plásticos</h2>
                        <p style="font-family: 'Comic Sans MS', cursive; font-size: 1.1rem; color: #444;">
                            El plástico se clasifica en diferentes tipos según su composición.
                        </p>
                    </div>
                    <div style="flex: 2; padding-left: 20px;">
                        <ul style="list-style-type: none; padding-left: 0; font-family: 'Arial', sans-serif;">
                            <li style="margin-bottom: 10px; display: flex; align-items: center;">
                                <span style="margin-right: 10px;">➡️</span> Revisa el símbolo de reciclaje
                            </li>
                            <li style="margin-bottom: 10px; display: flex; align-items: center;">
                                <span style="margin-right: 10px;">➡️</span> Clasifícalos correctamente
                            </li>
                        </ul>
                    </div>
                </div>
            `;
            break;
        default:
            content = `<p>No hay información disponible para esta clasificación.</p>`;
    }

    // Añadir el contenido al div
    infoSection.innerHTML = content;
}


init();
