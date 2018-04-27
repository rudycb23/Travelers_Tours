(() => {
  'use strict';
  angular
    .module('travelersTours')
    .controller('controladorModificarHotel', controladorModificarHotel);

  controladorModificarHotel.$inject = ['$stateParams', '$state', '$http', 'servicioHoteles', 'servicioLogin', 'imageUploadService', 'Upload'];

  function controladorModificarHotel($stateParams, $state, $http, servicioHoteles, servicioLogin, imageUploadService, Upload) {
    let vm = this;

    const userAuth = servicioLogin.getAuthUser();
    if (userAuth == undefined) {
      $state.go('main.inicio');
    }

    const hotelActivo = servicioHoteles.consultarDatosSession();
    if (hotelActivo == undefined) {
      $state.go('main.listarHoteles');
    }
    vm.rol = userAuth.getRol();
    vm.hotelMostrar = hotelActivo;


    let coords = [];
    coords[0] = (hotelActivo.latitud);
    coords[1] = (hotelActivo.longitud);

    vm.position = coords;



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

    vm.comida = $http({
      method: 'GET',
      url: './sources/data/comida.json'
    }).then((success) => {
      vm.comida = success.data;
    }, (error) => {
    });
    vm.servicio = $http({
      method: 'GET',
      url: './sources/data/servicio.json'
    }).then((success) => {
      vm.servicio = success.data;
    }, (error) => {
    });
    vm.habitaciones = $http({
      method: 'GET',
      url: './sources/data/habitaciones.json'
    }).then((success) => {
      vm.habitaciones = success.data;
    }, (error) => {
    });
    vm.infraestructura = $http({
      method: 'GET',
      url: './sources/data/infraestructura.json'
    }).then((success) => {
      vm.infraestructura = success.data;
    }, (error) => {
    });
    vm.limpieza = $http({
      method: 'GET',
      url: './sources/data/limpieza.json'
    }).then((success) => {
      vm.limpieza = success.data;
    }, (error) => {
    });

    let valor = 0,
      subvalorGeneral = 0;

    vm.valorarHotel = (comida, servicio, habitaciones, infraestructura, limpieza) => {
      const hotelActivo = servicioHoteles.consultarDatosSession();
      let Rates = hotelActivo.cantRates,
        valoracionTotal = hotelActivo.totalValor,
        totalRates = Rates + 1;
      let subvalor = Math.round((comida.name + servicio.name + habitaciones.name + infraestructura.name + limpieza.name) / 5);
      let totalValor = valoracionTotal + subvalor;
      let subvalorGeneral = Math.round(totalValor / totalRates);

      let valoracion = subvalorGeneral;
      let estadohotel = true;
      let cantRates = totalRates;

      let objHotelFormato = new Hotel(hotelActivo.idHotel, hotelActivo.nombreHotel, hotelActivo.provincia, hotelActivo.canton, hotelActivo.distrito, hotelActivo.direccion, hotelActivo.telefonoServicio, hotelActivo.correoServicio, hotelActivo.telefonoReservaciones, hotelActivo.correoReservaciones, hotelActivo.fotoHotel, valoracion, estadohotel, hotelActivo.latitud, hotelActivo.longitud, hotelActivo.mapa, cantRates, totalValor);

      let updateValido = servicioHoteles.editarHotel(objHotelFormato);

      if (updateValido == true) {
        swal({
          title: "Acción con éxito",
          text: "Hotel valorado correctamente",
          icon: "success",
          button: "Aceptar"
        });

        $state.go('main.listarHoteles');
      }
      vm.HotelNueva = null;
      listarHoteles();

    }

    vm.hotelMod = {};



    vm.cloudObj = imageUploadService.getConfiguration();

    vm.preRegistrarHotel = (photelNuevo) => {

      vm.cloudObj.data.file = photelNuevo.foto[0];
      Upload.upload(vm.cloudObj).success((data) => {
        vm.registrarHotel(photelNuevo, data.url);
      });
    }




    vm.onDragEnd = ($event) => {
      let postion = [$event.latLng.lat(), $event.latLng.lng()];

      vm.coords = postion;
  }
    vm.modificarHotel = (hotelMod, urlImagen) => {

      let latitud = vm.coords[0],
        longitud = vm.coords[1];
      let mapa = [];
      mapa.push(latitud);
      mapa.push(longitud);

      let ubicacion = vm.coords;

      let objHotelFormato = new Hotel(hotelActivo.idHotel, hotelMod.nombreHotel, hotelMod.provincia, hotelMod.canton, hotelMod.distrito, hotelMod.direccion, hotelMod.telefonoServicio, hotelMod.correoServicio, hotelMod.telefonoReservaciones, hotelMod.correoReservaciones, hotelMod.fotoHotel, hotelActivo.valoracion, hotelActivo.estadohotel, hotelMod.latitud, hotelMod.longitud, hotelMod.mapa, hotelActivo.cantRates, hotelActivo.totalValor);

      let updateValido = servicioHoteles.editarHotel(objHotelFormato);

      if (updateValido == true) {
        swal({
          title: "Actualización exitosa",
          text: "Hotel actualizado correctamente",
          icon: "success",
          button: "Aceptar"
        });

        $state.go('main.listarHoteles');
      }
      vm.HotelNueva = null;
      listarHoteles();
    }

    function listarHoteles() {
      vm.listaHotel = servicioHoteles.retornarHotel();
    }

    vm.regresar = () => {
      servicioHoteles.removerDatosSession();
      $state.go('main.listarHoteles');
    }
  }
})();