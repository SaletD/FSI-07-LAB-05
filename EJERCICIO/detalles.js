<!DOCTYPE html>
<html>
<head>
    <title>Detalles de la Reserva</title>
</head>
<body>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var queryString = window.location.search;
            var urlParams = new URLSearchParams(queryString);
            
            var nombre_reserva = urlParams.get("nombre_reserva");
            var habitacion_reserva = urlParams.get("habitacion_reserva");
            var fechaIngreso_reserva = urlParams.get("fechaIngreso_reserva");
            var noches_reserva = urlParams.get("noches_reserva");

            if (nombre_reserva) {
                var detailsContainer = document.createElement('div');
                detailsContainer.innerHTML = "<h2>Detalles de la Reserva:</h2>" +
                    "<p><strong>Nombre:</strong> " + nombre_reserva + "</p>" +
                    "<p><strong>Habitación:</strong> " + habitacion_reserva + "</p>" +
                    "<p><strong>Ficha de Ingreso:</strong> " + fechaIngreso_reserva + "</p>" +
                    "<p><strong>Noches:</strong> " + noches_reserva + "</p>";
                
                document.body.appendChild(detailsContainer);
            }
        });
    </script>
</body>
</html>
