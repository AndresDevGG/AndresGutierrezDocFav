<?php

// Interfaz UserRepositoryInterface


interface UserRepositoryInterface
{
    public function guardar(array $user): array;
    public function actualizar(String $nombre, array $user);
    public function eliminar(String $nombre);
    public function obtener(String $nombre);
}

class User
{
    public $nombre;
    public $correoElectronico;
    public $contrasena;
    public $userRepository;

    public function __construct($nombre, $correoElectronico, $contrasena, UserRepositoryInterface $userRepository)
    {
        $this->nombre = $nombre;
        $this->correoElectronico = $correoElectronico;
        $this->contrasena = $contrasena;
        $this->userRepository = $userRepository;
    }


    public function guardarUsuario()
    {
        $dataUsuario = [
            "nombre" => $this->nombre,
            "correoElectronico" => $this->correoElectronico,
            "contrasena" => $this->contrasena
        ];
        $response = $this->userRepository->guardar($dataUsuario);
        return $response;
    }

    public function obtenerPorNombre(String $nombre)
    {
        return $this->userRepository->obtener($nombre);
    }

    public function eliminarUsuario(String $nombre)
    {
        return $this->userRepository->eliminar($nombre);
    }
    public function actualizarUsuario(String $nombre)
    {
        $dataUsuario = [
            "nombre" => $this->nombre,
            "correoElectronico" => $this->correoElectronico,
            "contrasena" => $this->contrasena
        ];
        return $this->userRepository->actualizar($nombre, $dataUsuario);
    }
}

// Clase UserRepository
class UserRepository implements UserRepositoryInterface
{
    public $usuarios = array();

    public function guardar(array $user): array
    {
        $this->usuarios[] = $user;
        return [
            "status" => true,
            "message" => "usuario creado con exito"
        ];
    }

    public function obtener(String $name)
    {
        $user = [];
        foreach ($this->usuarios as $key => $value) {

            if ($value->nombre == $name) {
                return $value;
            }
        }
        if (count($user) > 0) {
            return [
                "status" => true,
                "data" => $user
            ];
        }

        return ["status" => false, "data" => null];
    }

    public function actualizar(String $name, array $user)
    {
        foreach ($this->usuarios as $key => $value) {
            if ($name == $value->nombre) {
                $this->usuarios[$key] = $user;
                return [
                    "status" => true,
                    "message" => "usuario actualizado con exito"
                ];
            }
        }

        return [
            "status" => false,
            "message" => "error al actualizar el usuario"
        ];
    }


    public function eliminar(String $name)
    {
        foreach ($this->usuarios as $key => $value) {
            if ($name == $value->nombre) {
                unset($this->usuarios[$key]);
                return [
                    "status" => true,
                    "message" => "usuario eliminado con exito"
                ];
            }
        }

        return [
            "status" => false,
            "message" => "el usuario no pudo ser eliminado",
        ];
    }
}

// // Ejemplo de uso
$userRepository = new UserRepository();

// // Crear usuarios
$user1 = new User("John Doe", "john.doe@example.com", "contrasena1", $userRepository);
// $user2 = new User("Jane Doe", "jane.doe@example.com", "contrasena2", $userRepository);

// // Guardar usuarios a través de la clase User
$user1->guardarUsuario();
// $user2->guardarUsuario();

// // Buscar usuario por correo electrónico a través de la clase User
// $correoElectronicoBuscar = "john.doe@example.com";
// $usuarioEcontrado = $user1->obtenerPorNombre("John Doe");

// if ($usuarioEcontrado == null) {
//     echo "usuario por nombre no econtrado";
// } else {
//     echo "usuario encontrado";
// }

// echo "<br>";
// echo "************************************";
// echo "<br>";
// echo "actualizacion";
// echo "<br>";



// $user1->eliminarUsuario("Jane Doe");





// Eliminar un usuario a través de la clase User
// $user1->eliminarUsuario();

// Mostrar usuarios después de la eliminación
// foreach ($userRepository->obtenerTodosLosUsuarios() as $usuario) {
//     echo $usuario . "<br>";
// }
