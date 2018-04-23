(() => {
    'use strict';
    angular
      .module('correosCR')
      .controller('controladorRegistroEncargado', controladorRegistroEncargado);
  
    controladorRegistroEncargado.$inject = ['$http', '$stateParams', '$state', 'servicioUsuarios' /*, 'servicioSucursales'*/];
  
    function controladorRegistroEncargado($http, $stateParams, $state, servicioUsuarios /*,servicioSucursales*/) {
      let vm = this;
  
      let rol;
      vm.definirRol = (prol) => {
       rol = Number(prol);
  
      vm.obtenerRol = rol;
      }
  
    //   vm.obtenerInfoSucursal = servicioSucursales.retornarNombreSucursalesLS();
  
      vm.registrarEncargado = (pnuevoEncargado) => {
      
        let estadoDesactivado = true;
  
        let objEncargadoTem = new Encargado(pnuevoEncargado.nombre, pnuevoEncargado.segundoNombre, pnuevoEncargado.apellido, pnuevoEncargado.segundoApellido, pnuevoEncargado.foto, pnuevoEncargado.cedula, pnuevoEncargado.fecha, pnuevoEncargado.genero, pnuevoEncargado.provincia, pnuevoEncargado.canton, pnuevoEncargado.distrito, pnuevoEncargado.direccion, pnuevoEncargado.correo, pnuevoEncargado.contrasenna, rol, estadoDesactivado, pnuevoEncargado.telefono, pnuevoEncargado.telefonoAdicional, pnuevoEncargado.sucursal, pnuevoEncargado.rolAduana);
  
        let edad = verificarEdad(objEncargadoTem.fecha),
            validarContrasenas = validarContrasenias(pnuevoEncargado.contrasenna, pnuevoEncargado.confirmarContrasenna);
  
        if(!edad){
          swal({
            title: "Registro no exitoso",
            text: "Verifique su edad",
            icon: "error",
            button: "Aceptar"
          });
        }else{
          if(!validarContrasenas){
            swal({
              title: "Registro no exitoso",
              text: "Verifique las contrasenas",
              icon: "error",
              button: "Aceptar"
            });
          }else{
  
            let repetido = servicioUsuarios.agregarUsuario(objEncargadoTem);
  
            if (repetido) {
              swal({
                title: "Registro exitoso",
                text: "Registrado correctamente.",
                icon: "success",
                button: "Aceptar"
              });
              vm.nuevoEncargado = null;
            }else{
              swal({
                title: "Registro no exitoso",
                text: "Ya existe en el sistema",
                icon: "error",
                button: "Aceptar"
              });
            }
  
          }
        }
      }
  
  
      function verificarEdad(pnacimiento){
        let menor = false,
            edadMs = new Date() - pnacimiento;
  
        if(edadMs/31536000000<18){
          menor = true
        }
        return !menor
      }
  
      function validarContrasenias(pcontrasena, pconfirmarContrasena){
        let diferentes = false;
  
        if(pcontrasena != pconfirmarContrasena){
          diferentes = true
        }
  
        return !diferentes
      }
    }
  })();
  