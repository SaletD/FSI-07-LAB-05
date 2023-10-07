<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="estilo.css">
</head>
<body>
    <div class="container">
    </div>
    <?php
    $nombre_reserva = "";
    $habitacion_reserva = "";
    $fechaIngreso_reserva = "";
    $noches_reserva = "";
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $servername = "localhost";
        $username = "root";
        $password = " "; 
        $dbname = "hotel";
        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            die("Conexión fallida: " . $conn->connect_error);
        }
        $nombre = $_POST["nombre"];
        $habitacion = $_POST["habitacion"];
        $fechaInicio = $_POST["fichaingreso"];
        $noches = $_POST["noches"];
        $huespedes = $_POST["huespedes"];
        $sql = "SELECT id FROM usuarios WHERE nombres = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $nombre);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $usuarioId = $row["id"];
            $sql_reserva = "INSERT INTO reservas (usuarios_id, fichaingreso, noches, habitacion, huespedes) 
                            VALUES (?, ?, ?, ?, ?)";
            $stmt_reserva = $conn->prepare($sql_reserva);
            $stmt_reserva->bind_param("issis", $usuarioId, $fechaInicio, $noches, $habitacion, $huespedes);

            if ($stmt_reserva->execute()) {
                echo "Reserva realizada con éxito.<br>";
                header("Location: detalles.php?nombre_reserva=$nombre&habitacion_reserva=$habitacion&fechaIngreso_reserva=$fechaInicio&noches_reserva=$noches");
                exit;
            } else {
                echo "Error al realizar la reserva: " . $stmt_reserva->error . "<br>";
            }
        } else {
            echo "<div class='mensaje-error'>¡El usuario no existe!</div> <span class='boton-registrarse'><a href='registro.php'>Registrarse</a></span>.<br>";
        }
        $stmt->close();
        $stmt_reserva->close();
        $conn->close();
    }
    ?>
    <form action=""  method="post" id="reservation-form">
        <div class="form-group">
            <label for="nombre">Elige usuario:</label>
            <input type="text" id="nombre" name="nombre" required><br><br>
        </div>
        <div class="form-group">
            <label for="habitacion">Habitación:</label>
            <input type="text" id="habitacion" name="habitacion" required><br><br>
        </div>
        <div class="form-group">
            <label for="fichaingreso">Fecha de Entrada:</label>
            <input type="date" id="fichaingreso" name="fichaingreso" required><br><br>
        </div>
        <div class="form-group">
            <label for="huespedes">N° de Huéspedes:</label>
            <input type="text" id="huespedes" name="huespedes" required><br><br>
        </div>
        <div class="form-group">
            <label for="noches">Noches:</label>
            <input type="number" id="noches" name="noches" required><br><br>
        </div>
        <button type="submit">Reservar</button>
    </form>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('reservation-form');
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                const nombre = document.getElementById('nombre').value;
                const habitacion = document.getElementById('habitacion').value;
                const fichaingreso = document.getElementById('fichaingreso').value;
                const huespedes = document.getElementById('huespedes').value;
                const noches = document.getElementById('noches').value;
                if (nombre === '' || habitacion === '' || fichaingreso === '' || huespedes === '' || noches === '') {
                    alert('Por favor, complete todos los campos.');
                    return;
                }
                form.submit();
            });
        });
    </script>
</body>
</html>
