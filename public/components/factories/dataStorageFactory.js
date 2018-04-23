(() => {
  'use strict';
  angular
    .module('travelersTours')
    .factory('dataStorageFactory', dataStorageFactory);

  dataStorageFactory.$inject = ['$q', '$log', '$http'];

  function dataStorageFactory($q, $log, $http) {
    const dataAPI = {
      getUsersData: _getUsersData,
      setUserData: _setUserData,
      updateUserData: _updateUserData,

      getHotel: _getHotel,
      setPackage: _setHotel,
      updateHotel: _updateHotel,

      setSession: _setSession,
      closeSession: _closeSession,
      getSession: _getSession
    };
    return dataAPI;

    function _getUsersData() {
      let listaUsuarios = [];

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/get_all_travelers',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {}
      });

      peticion.done((usuarios) => {
        // console.log('Datos que vienen desde la base de datos')
        // console.log(usuarios);
        listaUsuarios = usuarios;
      });
      peticion.fail(() => {
        listaUsuarios = [];
        console.log('Ocurrió un error');
      });

      return listaUsuarios;
    }

    /**
     * Toma el objejeto y o envía al backend por una petición de $ajax
     * @param {objeto usuario} data 
     */
    function _setUserData(data) {
      let response;

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/save_traveler',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
          'cadula': data.cedula,
          'primerNombre': data.primerNombre,
          'segundoNombre': data.segundoNombre,
          'primerApellido': data.primerApellido,
          'segundoApellido': data.segundoApellido,
          'edad': data.edad,
          'genero': data.genero,
          'correo': data.correo,
          'telefono': data.telefono,
          'contrasenna': data.contrasenna,
          'rol': data.rol
        }
      });

      peticion.done((datos) => {
        response = datos.success;
        console.log('Petición realizada con éxito');
      });
      peticion.fail((error) => {
        response = error;
        console.log('Ocurrió un error');
      });

      return response;
    }

    function _updateUserData(data) {
      let respuesta;

      let peticion = $.ajax({
        url: 'http://localhost:4000/api//update_traveler',
        type: 'put',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

          'cadula': data.cedula,
          'primerNombre': data.primerNombre,
          'segundoNombre': data.segundoNombre,
          'primerApellido': data.primerApellido,
          'segundoApellido': data.segundoApellido,
          'edad': data.edad,
          'genero': data.genero,
          'correo': data.correo,
          'telefono': data.telefono,
          'contrasenna': data.contrasenna,
          'rol': data.rol

        }
      });
      peticion.done((datos) => {
        respuesta = datos.msg;
        console.log('Petición realizada con éxito')
      });
      peticion.fail((error) => {
        respuesta = error;
        console.log('Error en la petición')
      });
      return respuesta;
    }
    /** 
         
    * Función que recibe el correo electrónico y el mensaje a enviar.
         * @param {Correo y contrasenna, informacion que se va a enviar por mail} data 
         */
    function _sendMail(data) {
      let response;

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/mail',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
          'to': data.to,
          'subject': data.subject,
          'text': data.text
        }
      });

      peticion.done((datos) => {
        console.log(datos);
      });
      peticion.fail((error) => {
        response = error;
        console.log(error);
      });
    }

    function _getHotel() {
      let listahoteles = [];

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/get_all_hotels',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

        }
      });

      peticion.done((datos) => {
        // console.log('Datos que vienen desde la base de datos')
        // console.log(datos);
        listahoteles = datos;
      });
      peticion.fail(() => {
        listahoteles = [];
        // console.log('Ocurrió un error');
      });

      return listahoteles;
    }

    function _setHotel(nuevoHotel) {
      let response;

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/save_hotel',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
          'idHotel': nuevoHotel.idHotel,
          'provincia': nuevoHotel.provincia,
          'canton': nuevoHotel.canton,
          'distrito': nuevoHotel.distrito,
          'direccion': nuevoHotel.direccion,
          'telefonoServicio': nuevoHotel.telefonoServicio,
          'correoServicio': nuevoHotel.correoServicio,
          'telefonoReservaciones': nuevoHotel.telefonoReservaciones,
          'correoReservaciones': nuevoHotel.correoReservaciones,
          'fotoHotel': nuevoHotel.fotoHotel,
          'valoracion': nuevoHotel.valoracion
        }
      });

      peticion.done((datos) => {
        response = datos.success;
        console.log('Petición realizada con éxito');
      });
      peticion.fail((error) => {
        response = error;
        console.log('Ocurrió un error');
      });

      return response;
    }


    function _updateHotel(hotelActualizado) {
      let response;

      let peticion = $.ajax({
        url: 'http://localhost:4000/api/update_hotel',
        type: 'put',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
          'idHotel': hotelActualizado.idHotel,
          'provincia': hotelActualizado.provincia,
          'canton': hotelActualizado.canton,
          'distrito': hotelActualizado.distrito,
          'direccion': hotelActualizado.direccion,
          'telefonoServicio': hotelActualizado.telefonoServicio,
          'correoServicio': hotelActualizado.correoServicio,
          'telefonoReservaciones': hotelActualizado.telefonoReservaciones,
          'correoReservaciones': hotelActualizado.correoReservaciones,
          'fotoHotel': hotelActualizado.fotoHotel,
          'valoracion': hotelActualizado.valoracion
        }
      });

      peticion.done((datos) => {
        response = datos.success;
        console.log('Petición realizada con éxito paquete actualizado');
      });
      peticion.fail((error) => {
        response = error;
        console.log('Ocurrió un error el actualizar paquete');
      });

      return response;
    }
    /** 
       * Función que almacena las datos dentro del session Storage
       */
    function _setData(value) {
      let response = true;
      sessionStorage.setItem('userData', JSON.stringify(value));
      return response;
    }

    /**
     * Función que elimina los datos de la sesión activa
     */
    function _removeData() {
      let response = true;
      sessionStorage.removeItem('userData');
      return response;
    };

    /**
     * Función que retorna los datos almacenados dentro del sessionStorage
     */
    function _getData() {
      let userData = JSON.parse(sessionStorage.getItem('userData'));
      return userData;
    }

    /**
   * Función que almacena las credenciales dentro del session Storage
   * @param {Credenciales} value 
   */
    function _setSession(value) {
      let response = true;
      sessionStorage.setItem('session', JSON.stringify(value));
      return response;
    }

    /**
     * Función que elimina los datos de la sesión activa
     */
    function _closeSession() {
      let response = true;
      sessionStorage.removeItem('session');
      return response;
    };

    /**
     * Función que retorna los datos almacenados dentro del sessionStorage
     */
    function _getSession() {
      let sessionActive = JSON.parse(sessionStorage.getItem('session'));
      return sessionActive;
    }
  }
})();