(() => {
  'use strict';
  angular
    .module('travelersTours')
    .service('servicioUsuarios', servicioUsuarios);

  servicioUsuarios.$inject = ['$q', '$log', '$http', 'dataStorageFactory', 'localStorageFactory'];

  function servicioUsuarios($q, $log, $http, dataStorageFactory, localStorageFactory) {

    const listaUsuarios = 'usuariosLS'; // este es el key

    let publicAPI = {
      agregarUsuario: _agregarUsuario,
      obtenerlistadeusuarios: _obtenerlistadeusuarios,
      obtenerlistadeFiltrada: _obtenerListaFiltrada,
      retornarCorreosUsuarios: _retornarCorreosUsuarios,
      actualizarUsuario: _actualizarUsuario,
     
    };
    return publicAPI;


    /**
     * Función que se comunica con el dataStorage para guardar el cliente.
     * @param {Objeto Usuario de cualquier tipo que va a ser almacenado en el backend} pNuevoUsuario 
     */
    function _agregarUsuario(pNuevoUsuario) {
      let listadeusuarios = _obtenerlistadeusuarios(),
        registrovalido,
        usuariorepetido = false;

      for (let i = 0; i < listadeusuarios.length; i++) {
        if (listadeusuarios[i].getCorreo() == pNuevoUsuario.getCorreo()) {
          usuariorepetido = true;
        }
      }

      if (usuariorepetido == true) {
        registrovalido = false;
      } else {
        
        registrovalido = dataStorageFactory.setUserData(pNuevoUsuario);
      }

      return registrovalido;
    };

    /**
     * función que obtiene la lista de usuarios del backend
     */
    function _obtenerlistadeusuarios() {
      let listadeusuarioslocal = dataStorageFactory.getUsersData(),
        listadeusuarios = [];

      listadeusuarioslocal.forEach(obj => {
        let tempfecha = new Date(obj.fecha);

        switch (Number(obj.rol)) {
          

          case 2:
            let tempCliente = new Cliente(obj.cedula, obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, obj.edad, obj.genero, obj.correo, obj.telefono, obj.contrasenna, obj.rol);

            listadeusuarios.push(tempCliente);
            break;

          default:

            let tempUsuario = new Usuario(obj.cedula, obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, obj.edad, obj.genero, obj.correo, obj.telefono, obj.contrasenna, obj.rol);

            listadeusuarios.push(tempUsuario);
            break;
        }
      });
      return listadeusuarios;
    }

    function _actualizarUsuario(pusuarioModificado) {
      let modificacionExitosa = dataStorageFactory.updateUserData(pusuarioModificado);
      return modificacionExitosa;
    }

    function _obtenerListaFiltrada(pnumrol) {
      let listadeusuarios = _obtenerlistadeusuarios(),
        listaFiltrada = [];

      for (let i = 0; i < listadeusuarios.length; i++) {
        if (listadeusuarios[i].getRol() == pnumrol) {
          listaFiltrada.push(listadeusuarios[i]);
        }
      }

      return listaFiltrada;
    }

    function _retornarCorreosUsuarios() {
      let usuariosLS = localStorageFactory.getItem(listaUsuarios),
        cedulasSistema = [];

      for (let i = 0; i < usuariosLS.length; i++) {
        cedulasSistema.push(usuariosLS[i].correo);
      }

      return cedulasSistema
    }

  };

})();
