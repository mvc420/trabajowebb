<?php
// Configuración de la conexión a la base de datos
$servidor = "localhost"; // O la IP de tu servidor de MySQL
$usuario = "root"; // Cambia esto si tienes otro usuario
$clave = ""; // Si tienes una contraseña, agrégala aquí
$baseDatos = "basedatos";

// Crear conexión
$conn = new mysqli($servidor, $usuario, $clave, $baseDatos);

// Verificar conexión
if ($conn->connect_error) {
    die("Error en la conexión: " . $conn->connect_error);
}

// Obtener datos del formulario
$nombres = $_POST['nombres'];
$apellidos = $_POST['apellidos'];
$email = $_POST['email'];
$dni = $_POST['dni'];

// Evitar inyección SQL
$nombres = $conn->real_escape_string($nombres);
$apellidos = $conn->real_escape_string($apellidos);
$email = $conn->real_escape_string($email);
$dni = $conn->real_escape_string($dni);

// Insertar datos en la base de datos
$sql = "INSERT INTO usuarios (nombres, apellidos, email, dni) VALUES ('$nombres', '$apellidos', '$email', '$dni')";

if ($conn->query($sql) === TRUE) {
    echo "Registro exitoso. <a href='index.html'>Volver</a>";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Cerrar conexión
$conn->close();
?>
