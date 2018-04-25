(() => {
  'use strict';
  angular
    .module('travelersTours')
    .controller('controladorRegistrarCliente', controladorRegistrarCliente);

  controladorRegistrarCliente.$inject = ['$http', '$stateParams', '$state', 'servicioUsuarios'];

  function controladorRegistrarCliente($http, $stateParams, $state, servicioUsuarios) {

    const vm = this;

    vm.travelerNuevo = {};

    vm.RegistrarViajero = (ptravelerNuevo) => {

      let confirmarContrasenna = false,
      contrasenna1 = vm.travelerNuevo.contrasenna,
      contrasenna2 = vm.travelerNuevo.contrasenna2;

      if(contrasenna1 == contrasenna2){
        confirmarContrasenna = true;
      }
      
      if (confirmarContrasenna == true) {
        let rol = 2;

        let objNuevoViajero = new Usuario(ptravelerNuevo.cedula, ptravelerNuevo.primerNombre, 
          ptravelerNuevo.segundoNombre, ptravelerNuevo.primerApellido, ptravelerNuevo.segundoApellido, 
          ptravelerNuevo.edad, ptravelerNuevo.genero, ptravelerNuevo.correo, ptravelerNuevo.telefono, 
          ptravelerNuevo.contrasenna, rol);

        let registro = servicioUsuarios.agregarUsuario(objNuevoViajero);
        

        if (registro == true) {
          swal({
            title: "Registro exitoso",
            text: "Cliente registrado correctamente, se ha enviado un correo electrónico con una contraseña provisional",
            icon: "success",
            button: "Aceptar"
          });
          vm.clienteNuevo = null;
      
        } else {
          swal({
            title: "Ha ocurrido un Error",
            text: "El usuario ha sido anteriormnete registrado.",
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
  }// fin controlador
})();