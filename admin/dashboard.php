<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart Bin Management Dashboard</title>
    <link rel="stylesheet" href="../css/css_dashboard.css">
</head>
<body>
    <div class="dashboard">
        <div class="sidebar">
            <h2>Admin</h2>
            <ul>
                <li><a href="#">Resumen del panel</a></li>
                <li><a href="#">Configuracion</a></li>
                <li><a href="#">Reportes</a></li>
                <li><a href="#">Programa de fidelizacion</a></li>
                <li><a href="#" class="active">Contenedores</a></li>
                <li><a href="#">Cola de tareas</a></li>
                <li><a href="#">Respaldos</a></li>
                <li><a href="#">Objetos dinamicos</a></li>
            </ul>
        </div>
        <div class="main-content">
            <div class="header">
                <h1>Gestion de contenedores</h1>
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
                            <th>Conexion</th>
                            <th>Nivel de basura</th>
                            <th>Zona</th>
                            <th>Direccion IP</th>
                            <th>Modelo</th>
                            <th>Numero de serie</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        // Example data, replace with database or dynamic data
                        $bins = [
                            [
                                'name' => 'Sin agrupar',
                                'status' => 'Desconnectado',
                                'connection' => 'Deshabilitado',
                                'trash_level' => 'N/A',
                                'zone' => 'Unknown',
                                'ip' => '100.0.115.201',
                                'model' => '',
                                'serial' => 'C01001FBPQF3972'
                            ],
                            [
                                'name' => '1 - Gradas',
                                'status' => 'Conectado',
                                'connection' => 'Sincronizado',
                                'trash_level' => '45%',
                                'zone' => 'Zona A',
                                'ip' => '192.168.10.5',
                                'model' => 'EchoBin-X300',
                                'serial' => 'SBX300-192837'
                            ],
                            [
                                'name' => '2 - Parque',
                                'status' => 'Conectado',
                                'connection' => 'Sincronizado',
                                'trash_level' => '75%',
                                'zone' => 'Zona C',
                                'ip' => '192.168.10.6',
                                'model' => 'EchoBin-X400',
                                'serial' => 'SBX400-293847'
                            ],
                            [
                                'name' => '3 - Zona central',
                                'status' => 'Conectado',
                                'connection' => 'Sincronizado',
                                'trash_level' => '30%',
                                'zone' => 'Zona B',
                                'ip' => '192.168.10.7',
                                'model' => 'EchoBin-X500',
                                'serial' => 'SBX500-394857'
                            ],
                        ];

                        foreach ($bins as $bin) {
                            echo "<tr>";
                            echo "<td>{$bin['name']}</td>";
                            echo "<td>{$bin['status']}</td>";
                            echo "<td>{$bin['connection']}</td>";
                            echo "<td>{$bin['trash_level']}</td>";
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
