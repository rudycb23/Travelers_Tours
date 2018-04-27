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
      obtenerListaFiltrada: _obtenerListaFiltrada,
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

        let objEmail = {
          to: pNuevoUsuario.getCorreo(),
          subject: 'Gracias por registrarse en nuestra plataforma le garantizamos la mejor expericia en sus próximas aventuras',
          text: pNuevoUsuario.getContrasenna()
        };
        dataStorageFactory.sendMail(objEmail);

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
        let tempfecha = new Date(obj.edad);

        let tempCliente = new Usuario(obj.cedula, obj.primerNombre, obj.segundoNombre, obj.primerApellido, obj.segundoApellido, obj.edad, obj.genero, obj.correo, obj.telefono, obj.contrasenna, obj.rol, obj.fotoCliente);

        listadeusuarios.push(tempCliente);

      });
      return listadeusuarios;
    }

    function _actualizarUsuario(pusuarioModificado) {
      let modificacionExitosa = dataStorageFactory.updateUserData(pusuarioModificado);
      return modificacionExitosa;
    }

    function _obtenerListaFiltrada() {
      let listadeusuarios = _obtenerlistadeusuarios(),
        listaFiltrada = [];

      for (let i = 0; i < listadeusuarios.length; i++) {
        if (listadeusuarios[i].getRol() == 2) {
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
