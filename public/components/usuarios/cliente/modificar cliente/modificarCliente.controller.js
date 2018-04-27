(() => {
    'use strict';
    angular
        .module('travelersTours')
        .controller('controladorModificarCliente', controladorModificarCliente);

    controladorModificarCliente.$inject = ['$http', '$stateParams', '$state', 'servicioUsuarios', 'servicioLogin'];

    function controladorModificarCliente($http, $stateParams, $state, servicioUsuarios, servicioLogin) {

        const vm = this;
        const userAuth = servicioLogin.getAuthUser();
        let usuarioActivo = userAuth.getCorreo();
        vm.travelerNuevo = {};

        vm.RegistrarViajero = (ptravelerNuevo) => {

            let confirmarContrasenna = false,
                contrasenna1 = vm.travelerNuevo.contrasenna,
                contrasenna2 = vm.travelerNuevo.contrasenna2;

            if (contrasenna1 == contrasenna2) {
                confirmarContrasenna = true;
            }

            if (confirmarContrasenna == true) {
                let rol = usuarioActivo.rol;

                let objNuevoViajero = new Usuario(ptravelerNuevo.cedula, ptravelerNuevo.primerNombre,
                    ptravelerNuevo.segundoNombre, ptravelerNuevo.primerApellido, ptravelerNuevo.segundoApellido,
                    ptravelerNuevo.edad, ptravelerNuevo.genero, usuarioActivo.correo, ptravelerNuevo.telefono,
                    ptravelerNuevo.contrasenna, rol);

                let registro = servicioUsuarios.actualizarUsuario(objNuevoViajero);


                if (registro == true) {
                    swal({
                        title: "Registro exitoso",
                        text: "Cliente actualizado correctamente",
                        icon: "success",
                        button: "Aceptar"
                    });
                    vm.clienteNuevo = null;

                } else {
                    swal({
                        title: "Ha ocurrido un Error",
                        text: "El usuario no se actualizó.",
                        icon: "error",
                        button: "Aceptar"
                    });
                }
            }// confirmar contraseña
            else {

                swal({
                    title: "Atención",
                    text: "Las contraseñas no coinciden",
                    icon: "error",
                    button: "Aceptar"
                });
            }
        }// fin registrar nuevo cliente

        
        vm.regresar = () => {
            $state.go('main.inicio');
        }
    }// fin controlador
})();