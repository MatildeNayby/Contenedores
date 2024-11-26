<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart Bin Management Dashboard</title>
    <link rel="stylesheet" href="../css/css_dashboard.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f8f5; /* Suave color verde ecológico */
            margin: 0;
        }

        .dashboard {
            display: flex;
        }

        .sidebar {
            width: 200px;
            background-color: #3a5d4f; /* Verde oscuro ecológico */
            color: white;
            padding: 20px;
            height: 100vh;
        }

        .sidebar h2 {
            text-align: center;
            margin-bottom: 20px;
        }

        .sidebar ul {
            list-style-type: none;
            padding: 0;
        }

        .sidebar ul li {
            margin: 15px 0;
        }

        .sidebar ul li a {
            color: white;
            text-decoration: none;
            font-weight: bold;
        }

        .sidebar ul li a.active {
            color: #a5d6a7; /* Verde claro */
        }

        .main-content {
            flex: 1;
            padding: 20px;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .header h1 {
            margin: 0;
            color: #2e7d32; /* Verde oscuro */
        }

        .header-buttons .btn {
            background-color: #66bb6a; /* Verde mediano */
            border: none;
            padding: 10px 15px;
            margin-left: 10px;
            color: white;
            cursor: pointer;
            border-radius: 5px;
        }

        .table-container {
            margin-top: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            background-color: white;
            border-radius: 5px;
            overflow: hidden;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }

        table th, table td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }

        table th {
            background-color: #4caf50; /* Verde oscuro */
            color: white;
        }

        .progress-bar {
            background-color: #c8e6c9; /* Verde claro */
            border-radius: 3px;
            overflow: hidden;
            height: 20px;
        }

        .progress-bar div {
            height: 100%;
            color: white;
            text-align: center;
            line-height: 20px;
            border-radius: 3px;
        }

        .plastic { background-color: #42a5f5; } /* Azul para plástico */
        .organic { background-color: #8bc34a; } /* Verde para orgánico */
        .inorganic { background-color: #ffa726; } /* Naranja para inorgánico */
        .aluminum { background-color: #c0c0c0; } /* Gris para aluminio */
    </style>
</head>
<body>
    <div class="dashboard">
        <div class="sidebar">
            <h2>Admin</h2>
            <ul>
                <li><a href="#">Resumen del panel</a></li>
                <li><a href="#">Configuración</a></li>
                <li><a href="#">Reportes</a></li>
                <li><a href="#">Programa de fidelización</a></li>
                <li><a href="#" class="active">Contenedores</a></li>
                <li><a href="#">Cola de tareas</a></li>
                <li><a href="#">Respaldos</a></li>
                <li><a href="#">Objetos dinámicos</a></li>
            </ul>
        </div>
        <div class="main-content">
            <div class="header">
                <h1>Gestión de contenedores</h1>
                <div class="header-buttons">
                    <button class="btn">Auto Refresh</button>
                    <button class="btn">Crear grupo</button>
                    <button class="btn">Nuevo contenedor</button>
                </div>
            </div>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Conexión</th>
                            <th>Nivel de Basura</th>
                            <th>Plástico</th>
                            <th>Orgánico</th>
                            <th>Inorgánico</th>
                            <th>Aluminio</th>
                            <th>Zona</th>
                            <th>Dirección IP</th>
                            <th>Modelo</th>
                            <th>Número de serie</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        // Ejemplo de datos, reemplaza con datos dinámicos o de base de datos
                        $bins = [
                            [
                                'name' => '1 - Gradas',
                                'status' => 'Conectado',
                                'connection' => 'Sincronizado',
                                'trash_level' => '45%',
                                'plastic' => 20,
                                'organic' => 15,
                                'inorganic' => 5,
                                'aluminum' => 5,
                                'zone' => 'Zona A',
                                'ip' => '192.168.10.5',
                                'model' => 'EchoBin-X300',
                                'serial' => 'SBX300-192837'
                            ],
                            [
                                'name' => '2 - Parque',
                                'status' => 'Conectado',
                                'connection' => 'Sincronizado',
                                'trash_level' => '70%',
                                'plastic' => 40,
                                'organic' => 10,
                                'inorganic' => 15,
                                'aluminum' => 5,
                                'zone' => 'Zona A',
                                'ip' => '192.168.10.7',
                                'model' => 'EchoBin-X300',
                                'serial' => 'SBX300-432123'
                            ],
                            [
                                'name' => '3 - Zona central',
                                'status' => 'Conectado',
                                'connection' => 'Sincronizado',
                                'trash_level' => '10%',
                                'plastic' => 7,
                                'organic' => 0,
                                'inorganic' => 3,
                                'aluminum' => 0,
                                'zone' => 'Zona A',
                                'ip' => '192.168.10.10',
                                'model' => 'EchoBin-X300',
                                'serial' => 'SBX300-432184'
                            ],
                            // Otros contenedores pueden ser añadidos aquí
                        ];

                        foreach ($bins as $bin) {
                            echo "<tr>";
                            echo "<td>{$bin['name']}</td>";
                            echo "<td>{$bin['status']}</td>";
                            echo "<td>{$bin['connection']}</td>";
                            echo "<td>{$bin['trash_level']}</td>";
                            echo "<td><div class='progress-bar'><div class='plastic' style='width: {$bin['plastic']}%'>{$bin['plastic']}%</div></div></td>";
                            echo "<td><div class='progress-bar'><div class='organic' style='width: {$bin['organic']}%'>{$bin['organic']}%</div></div></td>";
                            echo "<td><div class='progress-bar'><div class='inorganic' style='width: {$bin['inorganic']}%'>{$bin['inorganic']}%</div></div></td>";
                            echo "<td><div class='progress-bar'><div class='aluminum' style='width: {$bin['aluminum']}%'>{$bin['aluminum']}%</div></div></td>";
                            echo "<td>{$bin['zone']}</td>";
                            echo "<td>{$bin['ip']}</td>";
                            echo "<td>{$bin['model']}</td>";
                            echo "<td>{$bin['serial']}</td>";
                            echo "</tr>";
                        }
                        ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>
</html>
