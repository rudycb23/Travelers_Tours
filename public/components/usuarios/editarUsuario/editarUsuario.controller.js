(() => {
    'use strict';
    angular
        .module('correosCR')
        .controller('controladorEditarUsuario', controladorEditarUsuario)

        controladorEditarUsuario.$inject = ['$stateParams', '$state', '$http', 'servicioUsuarios', 'servicioInicioSesion'];

    function controladorEditarUsuario($stateParams, $state, $http, servicioUsuarios, servicioInicioSesion) {
        let vm = this;

        let objUsuarioActivo = servicioInicioSesion.getAuthUser();
        
        // Funcion que optiene las provincias
    vm.provincias = $http({
        method: 'GET',
        url: './sources/data/provincias.json'
      }).then((success) => {
        vm.provincias = success.data;
      }, (error) => {
      });
  
      // Funcion que rellena los los cantones
      vm.rellenarCantones = (pidProvincia) => {
        vm.cantones = $http({
          method: 'GET',
          url: './sources/data/cantones.json'
        }).then((success) => {
          let cantones = [];
          for (let i = 0; i < success.data.length; i++) {
            if (pidProvincia == success.data[i].idProvincia) {
              cantones.push(success.data[i]);
            }
          }
          vm.cantones = cantones;
        }, (error) => {
        });
      }
  
      vm.rellenarDistrito = (pidCanton) => {
        vm.distritos = $http({
          method: 'GET',
          url: './sources/data/distritos.json'
        }).then((success) => {
          let distritos = [];
          for (let i = 0; i < success.data.length; i++) {
            if (pidCanton == success.data[i].idCanton) {
              distritos.push(success.data[i]);
            }
          }
          vm.distritos = distritos;
        }, (error) => {
        });
      }

        switch (objUsuarioActivo.getRol()) {
            case '2':
                vm.tipoUsuario = 'Encaragado de Aduana';
                break;

            case '3':
                vm.tipoUsuario = 'Encaragado de Sucursal';
                break;
            
            case '4':
                vm.tipoUsuario = 'Repartidor';
                break;

            case '5':
                vm.tipoUsuario = 'Información';
                break;
        
            default:
                vm.tipoUsuario = 'Administrador';
                break;
        }

        console.log(objUsuarioActivo);

        vm.posicion = objUsuarioActivo.latitud + ', ' + objUsuarioActivo.longitud;

        vm.usuarioEditado = {
            nombre : objUsuarioActivo.primerNombre,
            segundoNombre: objUsuarioActivo.segundoNombre,
            primerApellido: objUsuarioActivo.primerApellido,
            segundoApellido: objUsuarioActivo.segundoApellido,
            foto: objUsuarioActivo.foto,
            cedula: objUsuarioActivo.cedula,
            telefono: objUsuarioActivo.telefono,
            segundotelefono: objUsuarioActivo.telefonoAdicional,
            fecha: objUsuarioActivo.fecha,
            sexo: objUsuarioActivo.genero,
            direccion: objUsuarioActivo.direccion,
            correo: objUsuarioActivo.correo,
            contrasenna: objUsuarioActivo.contrasenna,
            correo: objUsuarioActivo.correo
        }

    //     let objUsuarioFormato = new Usuario (objUsuarioSinFormato.primerNombre, objUsuarioSinFormato.segundoNombre, objUsuarioSinFormato.primerApellido, objUsuarioSinFormato.segundoApellido, objUsuarioSinFormato.foto,  objUsuarioSinFormato.cedula, objUsuarioSinFormato.fecha, objUsuarioSinFormato.genero, objUsuarioSinFormato.ubicacion, objUsuarioSinFormato.provincia, objUsuarioSinFormato.canton, objUsuarioSinFormato.distrito, objUsuarioSinFormato.direccion, objUsuarioSinFormato.correo, objUsuarioSinFormato.foto, objUsuarioSinFormato.contrasenna, objUsuarioSinFormato.rol, objUsuarioSinFormato.estado);

    //     let datos = [objUsuarioFormato.getCorreo()];

    //     vm.usuarioEditado = {}

    //     vm.usuarioEditado.cedula = objUsuarioFormato.cedula;
    //     vm.usuarioEditado.fecha = objUsuarioFormato.fecha;
    //     vm.usuarioEditado.genero = objUsuarioFormato.genero;
    //     vm.usuarioEditado.ubicacion = objUsuarioFormato.ubicacion;
    //     vm.usuarioEditado.provincia = objUsuarioFormato.provincia;
    //     vm.usuarioEditado.canton = objUsuarioFormato.canton;
    //     vm.usuarioEditado.distrito = objUsuarioFormato.distrito;
    //     vm.usuarioEditado.direccion = objUsuarioFormato.direccion;
    //     vm.usuarioEditado.correo = objUsuarioFormato.correo;
    //     vm.usuarioEditado.foto = objUsuarioFormato.foto;
    //     vm.usuarioEditado.contrasenna = objUsuarioFormato.contrasenna;
    //     vm.usuarioEditado.rol = objUsuarioFormato.rol;
    //     vm.usuarioEditado.estado = objUsuarioFormato.estado;

    //     vm.editarUsuario = (pusuario) => {

    //         let clienteEditado = new usuario (pentierro.entierroID, pentierro.horaInicio, pentierro.horaFinal, pentierro.fecha, pentierro.lugar, pentierro.prioridad);

    //         objEntierroEditado.setCedulaCliente(datos[0]);
    //         objEntierroEditado.setIdDifunto(datos[1]);

    //         let actualizarCorrecto = servicioUsuarios.actualizarEntierro(objEntierroEditado);

    //         if (actualizarCorrecto == true) {
    //             swal({
    //                 title: "Actualización exitosa",
    //                 text: "Entierro actualizado correctamente",
    //                 icon: "success",
    //                 button: "Aceptar"
    //             });

    //             $state.go('listarDifuntos');
    //         }
    //     }

    //     vm.regresar = () => {
    //         $state.go('listarDifuntos');
    //     }
    }
})();