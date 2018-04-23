class Usuario {
  constructor(pcedula, pprimerNombre, psegundoNombre, pprimerApellido, psegundoApellido, pedad, pgenero, pcorreo, ptelefono, pcontrasenna, prol) {
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

class Administrador extends Usuario {
  constructor(pcedula, pprimerNombre, psegundoNombre, pprimerApellido, psegundoApellido, pedad, pgenero, pcorreo, ptelefono, pcontrasenna, prol) {

    super(pcedula, pprimerNombre, psegundoNombre, pprimerApellido, psegundoApellido, pedad, pgenero, pcorreo, ptelefono, pcontrasenna, prol);

  }
} // administrador

class Cliente extends Usuario {
  constructor(pcedula, pprimerNombre, psegundoNombre, pprimerApellido, psegundoApellido, pedad, pgenero, pcorreo, ptelefono, pcontrasenna, prol) {

    super(pcedula, pprimerNombre, psegundoNombre, pprimerApellido, psegundoApellido, pedad, pgenero, pcorreo, ptelefono, pcontrasenna, prol);

  }
} // cliente

class Hotel {
  constructor(pidHotel, pprovincia, pcanton, pdistrito, pdireccion, ptelefonoServicio, pcorreoServicio, ptelefonoReservaciones, pcorreoReservaciones, pfotoHotel, pvaloracion) {


    this.idHotel                = pidHotel;
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
  }
  getIdHotel() {
    return this.idHotel;
  }
  getValoracion() {
    return this.valoracion;
  }
} // hotel