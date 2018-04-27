class Usuario {
  constructor(pcedula, pprimerNombre, psegundoNombre, pprimerApellido, psegundoApellido, pedad, pgenero, pcorreo, ptelefono, pcontrasenna, prol,pfotoCliente) {
    this.cedula           = pcedula;
    this.primerNombre     = pprimerNombre;
    this.segundoNombre    = psegundoNombre;
    this.primerApellido   = pprimerApellido;
    this.segundoApellido  = psegundoApellido;
    this.edad             = pedad;
    this.genero           = pgenero;
    this.correo           = pcorreo;
    this.telefono         = ptelefono;
    this.contrasenna      = pcontrasenna;
    this.rol              = prol;
    this.fotoCliente     = pfotoCliente;
  }

  getCorreo() {
    return this.correo;
  }


  getContrasenna() {
    return this.contrasenna;
  }

  getRol() {
    return this.rol;

  }
}

class Hotel {
  constructor(pidHotel, pnombreHotel, pprovincia, pcanton, pdistrito, pdireccion, ptelefonoServicio, pcorreoServicio, ptelefonoReservaciones, pcorreoReservaciones, pfotoHotel, pvaloracion, pestadohotel,platitud, plongitud, pmapa, pcantRates,ptotalValor) {

    this.idHotel                = pidHotel;
    this.nombreHotel            = pnombreHotel;
    this.provincia              = pprovincia;
    this.canton                 = pcanton;
    this.distrito               = pdistrito;
    this.direccion              = pdireccion;
    this.telefonoServicio       = ptelefonoServicio;
    this.correoServicio         = pcorreoServicio;
    this.telefonoReservaciones  = ptelefonoReservaciones;
    this.correoReservaciones    = pcorreoReservaciones;
    this.fotoHotel              = pfotoHotel;
    this.valoracion             = pvaloracion;
    this.estadohotel            = pestadohotel;
    this.latitud                = platitud;
    this.longitud               = plongitud;
    this.mapa                   = pmapa;
    this.cantRates              = pcantRates;
    this.totalValor             = ptotalValor;
  }
  getIdHotel() {
    return this.idHotel;
  }
  getValoracion() {
    return this.valoracion;
  }

  getLatitud(){
    return this.latitud;
  }

  getLongitud(){
    return this.longitud;
  }
} // hotel