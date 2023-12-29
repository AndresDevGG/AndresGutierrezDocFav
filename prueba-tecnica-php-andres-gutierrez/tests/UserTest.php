<?php
require("./src/user.php");

use PHPUnit\Framework\TestCase;



class UserTest extends TestCase
{
    public function testGuardarUsuario()
    {
        $userRepositoryMock = $this->createMock(UserRepositoryInterface::class);

        $user = new User("John Doe", "john.doe@example.com", "contrasena1", $userRepositoryMock);

        $userRepositoryMock->expects($this->once())
            ->method('guardar')
            ->with(["nombre" => "John Doe", "correoElectronico" => "john.doe@example.com", "contrasena" => "contrasena1"])
            ->willReturn(["status" => true]);

        $response = $user->guardarUsuario();

        $this->assertEquals(true, $response["status"]);
    }

    public function testObtenerPorNombreOK()
    {
        $userRepositoryMock = $this->createMock(UserRepositoryInterface::class);
        $user = new User("John Doe", "john.doe@example.com", "contrasena1", $userRepositoryMock);

        $userRepositoryMock->expects($this->once())
            ->method('obtener')
            ->with('John Doe')
            ->willReturn(["status" => true]);

        $response = $user->obtenerPorNombre('John Doe');

        $this->assertEquals(true, $response["status"]);
    }
    public function testObtenerPorNombreEmpty()
    {
        $userRepositoryMock = $this->createMock(UserRepositoryInterface::class);
        $user = new User("John Doe", "john.doe@example.com", "contrasena1", $userRepositoryMock);

        $userRepositoryMock->expects($this->once())
            ->method('obtener')
            ->with('John Doe2')
            ->willReturn(["status" => false]);

        $response = $user->obtenerPorNombre('John Doe2');

        $this->assertEquals(false, $response["status"]);
    }

    public function testEliminarUsuarioOK()
    {
        $userRepositoryMock = $this->createMock(UserRepositoryInterface::class);
        $user = new User("John Doe", "john.doe@example.com", "contrasena1", $userRepositoryMock);

        $userRepositoryMock->expects($this->once())
            ->method('eliminar')
            ->with('John Doe')
            ->willReturn(["status" => true]);

        $response = $user->eliminarUsuario('John Doe');

        $this->assertEquals(true, $response["status"]);
    }

    public function testEliminarUsuarioNotFound()
    {
        $userRepositoryMock = $this->createMock(UserRepositoryInterface::class);
        $user = new User("John Doe", "john.doe@example.com", "contrasena1", $userRepositoryMock);

        $userRepositoryMock->expects($this->once())
            ->method('eliminar')
            ->with('John Doe2')
            ->willReturn(["status" => false]);

        $response = $user->eliminarUsuario('John Doe2');

        $this->assertEquals(false, $response["status"]);
    }

    public function testActualizarUsuarioOK()
    {
        $userRepositoryMock = $this->createMock(UserRepositoryInterface::class);

        $newUserMock = ["nombre" => "nuevo nombre", "correoElectronico" => "nuevoCorreo@gmail.com", "contrasena" => "***"];

        $user = new User("nuevo nombre", "nuevoCorreo@gmail.com", "***", $userRepositoryMock);

        $userRepositoryMock->expects($this->once())
            ->method('actualizar')
            ->with('John Doe2')
            ->willReturn(["status" => false]);


        $response = $user->actualizarUsuario('John Doe2', $newUserMock);

        $this->assertEquals(false, $response["status"]);
    }
}
