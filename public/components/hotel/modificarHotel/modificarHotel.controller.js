(() => {
    'use strict';
    angular
      .module('travelersTours')
      .controller('controladorModificarHotel', controladorModificarHotel);
  
      controladorModificarHotel.$inject = ['$stateParams', '$state', '$http', 'servicioHoteles'];
  
    function controladorModificarHotel($stateParams, $state, $http, servicioHoteles) {
      let vm = this;
  
      if (!$stateParams.objHotel) {
        $state.go('main.listarHoteles');
      }
  
      const hotelActivo = servicioHoteles.consultarDatosSession();
      if (hotelActivo == undefined) {
          $state.go('main.listarHoteles');
      }

      vm.hotelMostrar = hotelActivo;
  
      vm.hotelMod = {};
    
  
     
  
      vm.editarHotel = (photelEditar) => {
        if(photelEditar.estadoHotel==null){
            photelEditar.estadoHotel = true;
        }
  
        let objCarrierFormato = new Carriers(pcarrierEditar.codigoCarrier, pcarrierEditar.nombreCarrier, pcarrierEditar.estadoCarrier);
  
        let updateValido = servicioCarrier.editarCarrier(objCarrierFormato);
  
        if (updateValido == true) {
          swal({
            title: "Actualización exitosa",
            text: "Mensajero actualizado correctamente",
            icon: "success",
            button: "Aceptar"
          });
  
          $state.go('main.listarCarrier');
        }
        vm.CarrierNueva = null;
        listarCarriers();
      }
  
      function listarCarriers() {
        vm.listaCarrier = servicioCarrier.retornarCarrier();
      }
  
      vm.regresar = () => {
        $state.go('main.listarCarrier');
      }
    }
  })();