// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  existeUsuario: "Usuarios/existeUsuario/",
  checkPassword: "Usuarios/checkPassword/",
  isAdmin: "Usuarios/isAdmin/",
  getMunicipios: "Municipios/",
  getComunidades:"Comunidades/",
  getProvincias:"Provincias/",
  getProvinciasFromMunicipio:"Buqueda/filtrarProvinciaFromMunicipio",//nuevo
  getMuniFromProvincias:"Busqueda/filtrarMunicipiosFromProvincia",//nuevo
  getProvincias_comunidad:"Provincias/showFromComunidad/",
  crearComunidad: "Comunidades/createComunidad",//nuevo
  getMunicipios_provicia:"Municipios/showFromProvincia/",
  crearUser: "Usuarios/createUser/",
  getUsuarios: "Usuarios/",
  getColegios: "Colegios/",
  getHospitales: "Hospitales/",
  getIdFromCorreo: "Usuarios/getIdFromCorreo/",
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
