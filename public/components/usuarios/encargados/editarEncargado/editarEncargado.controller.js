(()=>{
    'use strict';
    angular
    .module('correosCR')
    .controller('controladorEditarEncargado', controladorEditarEncargado);
        
    controladorEditarEncargado.$inject = ['$http', '$stateParams', '$state', 'servicioUsuarios'/*, 'servicioSucursales'*/];
      
        function controladorEditarEncargado ($http, $stateParams, $state, servicioUsuarios/*, servicioSucursales*/){
          let vm = this;
  
          if(!$stateParams.datosMod) {
            $state.go ('main.listarEncargados');
          }
  
          let encargadoMod = JSON.parse($stateParams.datosMod);
   
        //   vm.obtenerInfoSucursal = servicioSucursales.retornarNombreSucursalesLS();
  
          vm.rolEncargado = String(encargadoMod.rol);
  
          vm.encargadoMod = {
            nombre : encargadoMod.primerNombre,
            segundoNombre : encargadoMod.segundoNombre,
            apellido : encargadoMod.primerApellido,
            segundoApellido : encargadoMod.segundoApellido,
            cedula : Number(encargadoMod.cedula),
            fecha : new Date(encargadoMod.fecha),
            genero : encargadoMod.genero,
            correo: encargadoMod.correo,
            telefono: Number(encargadoMod.telefono),
            telefonoAdicional: Number(encargadoMod.telefonoAdicional),
            sucursal: encargadoMod.sucursal,
            rolAduana: encargadoMod.rolAduana
  
        }
  
        vm.editarEncargado = (pencargadoMod)=>{

        pencargadoMod.estado = encargadoMod.estado;
        pencargadoMod.rol = encargadoMod.rol;
    
        let objEncargadoTem = new Encargado(pencargadoMod.nombre, pencargadoMod.segundoNombre, pencargadoMod.apellido, pencargadoMod.segundoApellido, pencargadoMod.foto, pencargadoMod.cedula, pencargadoMod.fecha, pencargadoMod.genero, pencargadoMod.provincia, pencargadoMod.canton, pencargadoMod.distrito, pencargadoMod.direccion, pencargadoMod.correo, pencargadoMod.contrasenna, pencargadoMod.rol, pencargadoMod.estado, pencargadoMod.telefono, pencargadoMod.telefonoAdicional, pencargadoMod.sucursal, pencargadoMod.rolAduana);
        
        let edadCorrecta = verificarEdad(pencargadoMod.fecha),
        contrasenasCorrectas = validarContrasenias(pencargadoMod.contrasenna, pencargadoMod.confirmarContrasenna);

        if(!edadCorrecta){
            swal({
            title: "Cambio no exitoso",
            text: "Por favor revise su edad.",
            icon: "error",
            button: "Aceptar"
            }); 
        }else{
            if(!contrasenasCorrectas){
            swal({
                title: "Cambio no exitoso",
                text: "Revise sus contrasenas.",
                icon: "error",
                button: "Aceptar"
                }); 
            }else{
            let registro = servicioUsuarios.actualizarUsuario(objEncargadoTem);
            console.log(objEncargadoTem);
    
            if (registro == true) {
                swal({
                title: "Cambio exitoso",
                text: "Cambio realizado correctamente.",
                icon: "success",
                button: "Aceptar"
                }); 
                vm.encargadoMod = null;
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