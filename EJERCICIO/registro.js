<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="estilo.css">
</head>
<body>
    <div class="container">
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var form = document.querySelector('form');
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                var nombre = document.getElementById('nombre').value;
                var apellidos = document.getElementById('apellidos').value;
                var dni = document.getElementById('dni').value;
                var celular = document.getElementById('celular').value;

                // Validación de campos requeridos
                if (nombre === '' || apellidos === '' || dni === '' || celular === '') {
                    alert('Por favor, complete todos los campos.');
                    return;
                }

                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'login.js', true);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            var respuesta = xhr.responseText;
                            console.log(respuesta);
                        } else {
                            alert('Error en la solicitud al servidor.');
                        }
                    }
                };


                var datos = 'nombre=' + encodeURIComponent(nombre) +
                            '&apellidos=' + encodeURIComponent(apellidos) +
                            '&dni=' + encodeURIComponent(dni) +
                            '&celular=' + encodeURIComponent(celular);

                xhr.send(datos);
            });
        });
    </script>
    <form action="" method="post">
        <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required><br><br>
            <label for="apellidos">Apellidos:</label>
            <input type="text" id="apellidos" name="apellidos" required><br><br>
        </div>
        <div class="form-group">
            <label for="dni">DNI:</label>
            <input type="text" id="dni" name="dni" required><br><br>
            <label for="celular">Celular:</label>
            <input type="text" id="celular" name="celular" required><br><br>
        </div>
        <button type="submit">Registrar</button>
    </form>
</body>
</html>

