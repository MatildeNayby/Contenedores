<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Descripción del Proyecto - Contenedor Ecológico Inteligente</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #e8f5e9; /* Verde claro */
            color: #2e7d32; /* Verde oscuro */
        }
        header {
            background-color: #1b5e20; /* Verde bosque */
            color: white;
            padding: 20px;
            text-align: center;
        }
        .content {
            padding: 20px;
        }
        iframe {
            width: 100%;
            height: 500px;
            border: 1px solid #ccc;
            margin-top: 20px;
        }
        .section {
            margin-bottom: 20px;
        }
        .section h2 {
            color: #1b5e20; /* Verde bosque */
        }
        ul {
            list-style: disc;
            margin-left: 20px;
        }
    </style>
</head>
<body>
    <header>
        <h1>Proyecto: Contenedor Ecológico Inteligente</h1>
    </header>
    <div class="content">
        <div class="section">
            <h2>Objetivo del Proyecto</h2>
            <p>
                El proyecto tiene como objetivo desarrollar un sistema de gestión inteligente y ecológico para la clasificación y recolección de residuos. 
                Este sistema utiliza tecnologías de Internet de las Cosas (IoT) y aprendizaje automático (IA) para identificar el tipo de basura, abrir el contenedor correspondiente y monitorear en tiempo real el estado del sistema.
            </p>
        </div>
        <div class="section">
            <h2>Componentes Electrónicos</h2>
            <p>
                El prototipo utiliza los siguientes componentes electrónicos, diseñados en Tinkercad para la fase inicial:
            </p>
            <ul>
                <li>
                    <strong>Microcontrolador:</strong> Arduino UNO, para el control del sistema.
                </li>
                <li>
                    <strong>Sensores:</strong>
                    <ul>
                        <li><strong>Sensor ultrasónico (HC-SR04):</strong> Mide el nivel de basura en el contenedor.</li>
                        <li><strong>Celda de carga + HX711:</strong> Mide el peso de los residuos.</li>
                    </ul>
                </li>
                <li>
                    <strong>Comunicación:</strong>
                    <ul>
                        <li><strong>Módulo Bluetooth HC-05:</strong> Para transmisión de datos.</li>
                        <li><strong>Módulo Wi-Fi (ESP8266 o ESP32):</strong> Para comunicación en red (fase avanzada).</li>
                    </ul>
                </li>
                <li>
                    <strong>Actuadores:</strong>
                    <ul>
                        <li><strong>Servomotores:</strong> Abren la tapa del contenedor correspondiente.</li>
                    </ul>
                </li>
                <li>
                    <strong>Identificación de Usuarios:</strong> Lector RFID (RC522) para identificar a los usuarios.
                </li>
            </ul>
        </div>
        <div class="section">
            <h2>Funcionalidad del Sistema</h2>
            <p>
                El sistema está diseñado para operar de la siguiente manera:
            </p>
            <ul>
                <li>
                    Una cámara conectada a un modelo entrenado en <strong>Teachable Machine</strong> identifica el tipo de basura (orgánica, plásticos, aluminio, etc.).
                </li>
                <li>
                    Según el tipo de residuo identificado, el microcontrolador activa el servomotor correspondiente para abrir el contenedor adecuado.
                </li>
                <li>
                    Sensores ultrasónicos y de peso monitorean el estado de los contenedores y envían datos en tiempo real al panel de administración.
                </li>
                <li>
                    La comunicación entre los componentes y el servidor se realiza mediante Bluetooth o Wi-Fi, dependiendo de la implementación.
                </li>
            </ul>
        </div>
        <div class="section">
            <h2>Ejemplo del Panel de Administración con una cuenta registrada</h2>
            <p>
                A continuación, se muestra un ejemplo del panel de administración que permite visualizar y gestionar los datos de los contenedores inteligentes:
            </p>
            <iframe src="dashboard.php" title="Panel de Administración"></iframe>
            <p>Cada uno de los contenedores podra ser vinculado con QR el cual brindara un token unico para ese dispositivo evitando que otra persona pueda escanearlo posteriormente.</p>
        </div>
        <div class="section">
            <h2>Implementación de IA con Teachable Machine</h2>
            <p>
                La inteligencia artificial juega un papel crucial en este proyecto. Con el modelo entrenado en <strong>Teachable Machine</strong>:
            </p>
            <ul>
                <li>
                    Una Raspberry Pi o computadora captura imágenes de los residuos mediante una cámara.
                </li>
                <li>
                    El modelo identifica el tipo de residuo y envía comandos al Arduino para operar los actuadores.
                </li>
                <li>
                    Esto permite una clasificación precisa y automática de los residuos, mejorando la eficiencia del reciclaje.
                </li>
            </ul>
        </div>
    </div>
</body>
</html>

