/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};

// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}

// Tags que voy a usar para sustituir los campos
Plantilla.plantillaTagsSoloNombres = {
    "NOMBRE": "### NOMBRE ###",
}


// Plantilla para poner los datos de varias personas dentro de una tabla
Plantilla.plantillaTablaPersonasTodosLosDatosSoloNombres = {}

// Cabecera de la tabla
Plantilla.plantillaTablaPersonasTodosLosDatosSoloNombres.cabecera = `<table width="100%" class="listado-personas-SoloNombres">
                    <thead>
                        <th width="20%">Nombres</th>
                    </thead>
                    <tbody>
    `;

// Elemento TR que muestra los datos de una persona
Plantilla.plantillaTablaPersonasTodosLosDatosSoloNombres.cuerpo = `
    <tr title="${Plantilla.plantillaTagsSoloNombres.ID}">
        <td>${Plantilla.plantillaTagsSoloNombres.NOMBRE}</td>
        </td>
    </tr>
    `;
    
// Pie de la tabla
Plantilla.plantillaTablaPersonasTodosLosDatosSoloNombres.pie = `        </tbody>
             </table>
             `;

/**
 * Actualiza el cuerpo de la plantilla deseada con los datos de la persona que se le pasa
 * @param {String} Plantilla Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */           
Plantilla.sustituyeTagsTodosLosDatosSoloNombres = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(Plantilla.plantillaTagsSoloNombres.NOMBRE, 'g'), persona.data.nombre)
}             

/**
 * Actualiza el cuerpo de la tabla con los datos de la persona que se le pasa
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Plantilla.plantillaTablaPersonasTodosLosDatosSoloNombres.actualiza = function (persona) {
    return Plantilla.sustituyeTagsTodosLosDatosSoloNombres(this.cuerpo, persona)
}

/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}

/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Plantilla.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}

/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Plantilla.procesarHome = function () {
    porCampo.style.display = 'none';
    porNombre.style.display = 'none';
    porMinimoUnCriterio.style.display = 'none';
    this.descargarRuta("/plantilla/", this.mostrarHome);
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Plantilla.procesarAcercaDe = function () {
    porCampo.style.display = 'none';
    porNombre.style.display = 'none';
    porMinimoUnCriterio.style.display = 'none';
    this.descargarRuta("/plantilla/acercade", this.mostrarAcercaDe);
}

/**
 * Función que recuperar todas las personas llamando al MS Personas
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

Plantilla.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }

    // Muestro todas las personas que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        callBackFn(vectorPersonas.data)
    }
}

/**
 * Función para mostrar en pantalla solo los nombres de todas las personas que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los nombres de las personas a mostrar
 */
Plantilla.imprimeSoloNombres = function (vector) {

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Plantilla.plantillaTablaPersonasTodosLosDatosSoloNombres.cabecera
    vector.forEach(e => msj += Plantilla.plantillaTablaPersonasTodosLosDatosSoloNombres.actualiza(e))
    msj += Plantilla.plantillaTablaPersonasTodosLosDatosSoloNombres.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de solo nombres de jugadores/as", msj)
}

/**
 * Función para mostrar en pantalla los nombres de todas las personas que se han recuperado de la BBDD pero ORDENADOS ALFABÉTICAMENTE.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */
Plantilla.imprimeSoloNombresOrdenados = function (vector) {

    vector.sort(function (a, b) {
        return a.data.nombre.localeCompare(b.data.nombre);
    });

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Plantilla.plantillaTablaPersonasTodosLosDatosSoloNombres.cabecera
    vector.forEach(e => msj += Plantilla.plantillaTablaPersonasTodosLosDatosSoloNombres.actualiza(e))
    msj += Plantilla.plantillaTablaPersonasTodosLosDatosSoloNombres.pie

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de solo nombres de jugadores/as", msj)
}

/**
 * Función principal para recuperar solo los nombres de las personas desde el MS y, posteriormente, imprimirlas.
 */
Plantilla.listarSoloNombres = function () {
    porCampo.style.display = 'none';
    porNombre.style.display = 'none';
    porMinimoUnCriterio.style.display = 'none';
    Plantilla.recupera(Plantilla.imprimeSoloNombres);
}

/**
 * Función principal para recuperar solo los nombres las personas desde el MS ORDENADO ALFABÉTICAMENTE y, posteriormente, imprimirlas.
 */
Plantilla.listarSoloNombresOrdenados = function () {
    porCampo.style.display = 'none';
    porNombre.style.display = 'none';
    porMinimoUnCriterio.style.display = 'none';
    Plantilla.recupera(Plantilla.imprimeSoloNombresOrdenados);
}

// Tags que voy a usar para sustituir todos los campos
Plantilla.plantillaTagsTodosLosDatos = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",
    "FEC_NAC": "### FEC_NAC ###",
    "COMPETICIONES": "### COMPETICIONES ###",
    "NACIONALIDAD": "### NACIONALIDAD ###",
    "PESO": "### PESO ###",
    "POSICION": "### POSICION ###",
}


/// Plantilla para poner todos los datos de todos/as los/as jugadores/as dentro de una tabla
Plantilla.plantillaTablaPersonasTodosLosDatos = {}

/// Plantilla para poner todos los datos de todos/as los/as jugadores/as dentro de una tabla
Plantilla.plantillaTablaPersonasTodosLosDatosSINID = {}

// Cabecera de la tabla que muestra todos los datos de todos/as los/as jugadores/as
Plantilla.plantillaTablaPersonasTodosLosDatos.cabecera = `<table width="100%" class="listado-personas-SoloNombres">
                    <thead>
                        <th width="10%">Id</th>
                        <th width="20%">Nombre</th>
                        <th width="20%">Apellidos</th>
                        <th width="10%">fecha nacimiento</th>
                        <th width="15%">Competiciones</th>
                        <th width="15%">Nacionalidad</th>
                        <th width="15%">Peso</th>
                        <th width="15%">Posición</th>
                        <th width="10%">Acciones</th>
                    </thead>
                    <tbody>
    `;

 // Cabecera de la tabla que muestra todos los datos de todos/as los/as jugadores/as
Plantilla.plantillaTablaPersonasTodosLosDatosSINID.cabecera = `<table width="100%" class="listado-personas-SoloNombres">
<thead>
    <th width="20%">Nombre</th>
    <th width="20%">Apellidos</th>
    <th width="10%">fecha nacimiento</th>
    <th width="15%">Competiciones</th>
    <th width="15%">Nacionalidad</th>
    <th width="15%">Peso</th>
    <th width="15%">Posición</th>
</thead>
<tbody>
`;   

// Elemento TR que muestra todos los datos de todos/as los/as jugadores/as
Plantilla.plantillaTablaPersonasTodosLosDatos.cuerpo = `
    <tr title="${Plantilla.plantillaTagsTodosLosDatos.ID}">
        <td>${Plantilla.plantillaTagsTodosLosDatos.ID}</td>
        <td>${Plantilla.plantillaTagsTodosLosDatos.NOMBRE}</td>
        <td>${Plantilla.plantillaTagsTodosLosDatos.APELLIDOS}</td>
        <td>${Plantilla.plantillaTagsTodosLosDatos.FEC_NAC}</td>
        <td>${Plantilla.plantillaTagsTodosLosDatos.COMPETICIONES}</td>
        <td>${Plantilla.plantillaTagsTodosLosDatos.NACIONALIDAD}</td>
        <td>${Plantilla.plantillaTagsTodosLosDatos.PESO}</td>
        <td>${Plantilla.plantillaTagsTodosLosDatos.POSICION}</td>
        <td><div><a href="javascript:Plantilla.mostrar('${Plantilla.plantillaTagsTodosLosDatos.ID}')" class="opcion-principal mostrar">Mostrar Jugador/a</a></div></td>
    </tr>
    `;

// Pie de la tabla de todos los datos de todos/as los/as jugadores/as
Plantilla.plantillaTablaPersonasTodosLosDatos.pie = `        </tbody>
             </table>
             `;

/**
 * Actualiza el cuerpo de la plantilla deseada con los datos del jugador/as que se le pasa
 * @param {String} Plantilla Cadena conteniendo HTML en la que se desea cambiar los campos de la plantilla por datos
 * @param {Persona} Persona Objeto con los datos del jugador/as que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */           
Plantilla.sustituyeTagsTodosLosDatos = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(Plantilla.plantillaTagsTodosLosDatos.ID, 'g'), persona.ref['@ref'].id)
        .replace(new RegExp(Plantilla.plantillaTagsTodosLosDatos.NOMBRE, 'g'), persona.data.nombre)
        .replace(new RegExp(Plantilla.plantillaTagsTodosLosDatos.APELLIDOS, 'g'), persona.data.apellidos)
        .replace(new RegExp(Plantilla.plantillaTagsTodosLosDatos.NACIONALIDAD, 'g'), persona.data.nacionalidad)
        .replace(new RegExp(Plantilla.plantillaTagsTodosLosDatos.PESO, 'g'), persona.data.peso)
        .replace(new RegExp(Plantilla.plantillaTagsTodosLosDatos.POSICION, 'g'), persona.data.posicion)
        .replace(new RegExp(Plantilla.plantillaTagsTodosLosDatos.COMPETICIONES, 'g'), persona.data.competiciones)
        .replace(new RegExp(Plantilla.plantillaTagsTodosLosDatos.FEC_NAC, 'g'), persona.data.fec_nac.dia + "/" + persona.data.fec_nac.mes + "/" + persona.data.fec_nac.anio)
}            

/**
 * Actualiza el cuerpo de la tabla con todos los datos de todos/as los/as jugadores/as que se le pasa
 * @param {Persona} Persona Objeto con todos los datos del jugador/a que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Plantilla.plantillaTablaPersonasTodosLosDatos.actualiza = function (persona) {
    return Plantilla.sustituyeTagsTodosLosDatos(this.cuerpo, persona)
}

Plantilla.listarTodosLosDatos = function (vector) {
    porCampo.style.display = 'none';
    porNombre.style.display = 'none';
    porMinimoUnCriterio.style.display = 'none';
    
    let msj = Plantilla.plantillaTablaPersonasTodosLosDatos.cabecera
    vector.forEach(e => msj += Plantilla.plantillaTablaPersonasTodosLosDatos.actualiza(e))
    msj += Plantilla.plantillaTablaPersonasTodosLosDatos.pie

    Frontend.Article.actualizar("Listado de todos los datos de todos/as los/as jugadores/as", msj)
}

/**
 * Función principal para recuperar todo los datos de todos/as los/as jugadores/as desde el MS y, posteriormente, imprimirlas.
 */
Plantilla.listarTodoLosDatos = function () {
    porNombre.style.display = 'none';
    porMinimoUnCriterio.style.display = 'none';
    Plantilla.recupera(Plantilla.listarTodosLosDatos);
}

/**
 * Función que se activa cuando se pulsa el botón de ordenar por campo
 */
Plantilla.ordenarPor = function () {
    const porCampo = document.querySelector('#porCampo');
    porCampo.style.display = 'block';
    porNombre.style.display = 'none';
    porMinimoUnCriterio.style.display = 'none';

    porCampo.addEventListener('submit', (event) => {
        event.preventDefault();
        const campo = document.querySelector('#campo').value;
        this.muestraJugadoresOrdenadosPor(campo, this.imprimePor);
    });
}

/**
 * Función que muestra los/as jugadores/as ordena por un campo
 * @param {String} campo campo por el que se ordenan los/as jugadores/as
 * @param {*} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.muestraJugadoresOrdenadosPor = async function (campo, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodas"
        const response = await fetch(url);
        if (response) {
            const jugadores = await response.json()
            callBackFn(campo, jugadores)
        }
    } catch (error) {
        alert("Error: No se ha podido acceder al API Gateway")
        console.error(error)
    }
}

/**
 * Función que imprime los/as jugadores/as ordenados por un campo
 * @param {String} campo campo por el que se van a mostrar los datos
 * @param {Vector_de_jugadores} vector Vector con los datos de los/as jugadores/as a mostrar
 */
Plantilla.imprimePor = function (campo, vector) {
    //Ordeno los campos numericos de mayor a menor. Los alfabéticos se hacen solos con el .sort()
    let ordena = vector.data.sort((a, b) => {
        if (campo === "fec_nac") {
            const fecha1 = new Date(a.data.fec_nac.anio, a.data.fec_nac.mes - 1, a.data.fec_nac.dia);
            const fecha2 = new Date(b.data.fec_nac.anio, b.data.fec_nac.mes - 1, b.data.fec_nac.dia);
            if (fecha1 < fecha2) {
                return -1;
              } else {
                return 1;
              }
        } else if (campo === "peso") {
            if (a.data[campo] > b.data[campo]) {
                return -1;
              } else {
                return 1;
              }
        } else {
            if (a.data[campo] < b.data[campo]) {
                return -1;
              } else {
                return 1;
              }
        }
    });

    let msj = "";
    msj += Plantilla.plantillaTablaPersonasTodosLosDatosSINID.cabecera;
    ordena.forEach(e => msj += Plantilla.cuerpoTr(e));
    msj += Plantilla.plantillaTablaPersonasTodosLosDatos.pie;

    Frontend.Article.actualizar("Listado de los/as jugadores/as ordenados por el campo que el usuario ha elegido ", msj);
}

/**
 * Lista la información del cuerpo de la tabla. Se hace un ajuste para la fecha debido a que en la base de datos se almacena como un objeto
 * @param {p} p Datos del jugador/a a mostrar
 * @returns El cuerpo de la tabla con los datos del jugador/a
 */
Plantilla.cuerpoTr = function (p) {
    const d = p.data
    const fecha = new Date(d.fec_nac.anio, d.fec_nac.mes - 1, d.fec_nac.dia);
    const fechaFormateada = fecha.toLocaleDateString();
    return `<tr><td>${d.nombre}</td><td>${d.apellidos}</td><td>${fechaFormateada}</td><td>${d.competiciones}</td><td>${d.nacionalidad}</td><td>${d.peso}</td><td>${d.posicion}</td></tr>`;
}

/**
 * Función que muestra los datos de un/a jugador/a
 * @param {*} id ID del jugador que queremos mostrar los datos
 */
Plantilla.mostrar = function (id) {
    this.obtieneJugador(id, this.jugador)
}

/**
 * Función que obtiene los datos de un/a jugador/a
 * @param {*} id id del jugador/a que queremos mostrar los datos
 * @param {*} callBackFn Función que se va a llamara cuando recuperemos al jugador/a
 */
Plantilla.obtieneJugador = async function (id, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getPorId/" + id
        const response = await fetch(url);
        if (response) {
            const jugador = await response.json()
            callBackFn(jugador)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }
}

/**
 * Función para actualizar la página web con los datos de un/a jugador/a
 * @param {*} jugador Datos del jugador/a que queremos mostrar
 */
Plantilla.jugador = function (jugador) {

    let msj = Plantilla.plantillaFormularioUnJugador.actualiza(jugador)
    Frontend.Article.actualizar("Jugador/a elegido/a", msj)
    return msj;
}

/// Plantilla para poner los datos de un/a jugado/a
Plantilla.plantillaFormularioUnJugador = {}

// Formulario para mostrar los datos de un/a jugador/a
Plantilla.plantillaFormularioUnJugador.formulario = `
<form method='post' action=''>
    <table width="100%" class="listado-personas-SoloNombres">
    <a href="javascript:Plantilla.jugadorAnterior()" class="opcion-principal mostrar">Anterior</a>
    <a href="javascript:Plantilla.jugadorSiguiente()"  class="opcion-principal mostrar">Siguiente</a>
        <thead>
            <th width="10%">Id</th>
            <th width="20%">Nombre</th>
            <th width="20%">Apellidos</th>
            <th width="20%">Fecha de nacimiento</th>
            <th width="20%">Competiciones</th>
            <th width="20%">Nacionalidad</th>
            <th width="20%">Peso</th>
            <th width="20%">Posición</th>
        </thead>
        <tbody>
            <tr title="${Plantilla.plantillaTagsTodosLosDatos.ID}">
                <td><input type="text" class="form-persona-elemento" disabled id="idJugador" value="${Plantilla.plantillaTagsTodosLosDatos.ID}" name="id"/></td>
                <td>${Plantilla.plantillaTagsTodosLosDatos.NOMBRE}</td>
                <td>${Plantilla.plantillaTagsTodosLosDatos.APELLIDOS}</td>
                <td>${Plantilla.plantillaTagsTodosLosDatos.FEC_NAC}</td>
                <td>${Plantilla.plantillaTagsTodosLosDatos.COMPETICIONES}</td>
                <td>${Plantilla.plantillaTagsTodosLosDatos.NACIONALIDAD}</td>
                <td>${Plantilla.plantillaTagsTodosLosDatos.PESO}</td>
                <td>${Plantilla.plantillaTagsTodosLosDatos.POSICION}</td>
            </tr>
        </tbody>
    </table>
</form>
`;

/**
 * Función que actualiza un/a jugador/as en la plantilla del formulario
 * @param {*} jugador La información del jugador/a que queremos mostrar
 * @returns 
 */
Plantilla.plantillaFormularioUnJugador.actualiza = function (jugador) {

    return Plantilla.sustituyeTagsTodosLosDatos(this.formulario, jugador)
}

// Función que nos muestra el/la siguiente jugador/a de la base de datos
Plantilla.jugadorSiguiente = function () {
    Plantilla.recupera(this.siguiente)
}

// Función que nos muestra el/la anterior jugador/a de la base de datos
Plantilla.jugadorAnterior = function () {
    Plantilla.recupera(this.anterior)
}

// Función que nos muestra el/la siguiente jugador/a de la base de datos
Plantilla.siguiente = function (vector) {
    let pos
    let indices = []
    if (Array.isArray(vector)) {
        for (let i = 0; i < vector.length; i++) {
            indices.push(vector[i].ref['@ref'].id)
        }
    }
    if (indices.length > 1)
        pos = indices.indexOf(document.getElementById("idJugador").value)
    if (typeof pos === "number") {
        pos++
        pos = (pos % vector.length + vector.length) % vector.length;
        Plantilla.mostrar(indices[pos])
    } else
        Plantilla.sustituyeTagsTodosLosDatos(Plantilla.plantillaFormularioUnJugador.formulario)
    return indices
}

// Función que nos muestra el/la anterior jugador/a de la base de datos
Plantilla.anterior = function (vector) {
    let pos
    let indices = []
    if (Array.isArray(vector)) {
        for (let i = 0; i < vector.length; i++) {
            indices.push(vector[i].ref['@ref'].id)
        }
    }
    if (indices.length > 1)
        pos = indices.indexOf(document.getElementById("idJugador").value)
    if (typeof pos === "number") {
        console.log(pos)
        pos--
        pos = (pos % vector.length + vector.length) % vector.length;
        Plantilla.mostrar(indices[pos])
    } else
        Plantilla.sustituyeTagsTodosLosDatos(Plantilla.plantillaFormularioUnJugador.formulario)
    return indices
}

/**
 * Función que busca un/a jugador/a por su nombre
 */
Plantilla.buscarPorNombre = function () {
    porNombre.style.display = 'block';
    porCampo.style.display = 'none';
    porMinimoUnCriterio.style.display = 'none';
}

/**
 * Función que busca a un/a jugador/a por un nombre.
 */
Plantilla.buscaPorNombre = function (buscarNombre) {
    this.recuperaPorNombre(buscarNombre, this.imprime);
}

/**
 * Función que filtrará los datos de la base de datos por nombre.
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.recuperaPorNombre = async function (buscarNombre, callBackFn) {
    let response = null

    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }

    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        const filtro = vectorPersonas.data.filter(persona => persona.data.nombre === buscarNombre);
        callBackFn(filtro)
    }
}

/**
 * Función que nos muestra un/a jugador/a de la base de datos
 * @param {Vector_de_persona} vector Vector con los datos de los plantilla a mostrar
 */
Plantilla.imprime = function (vector) {
    let msj = "";
    msj += Plantilla.plantillaTablaPersonasTodosLosDatosSINID.cabecera;
    vector.forEach(e => msj += Plantilla.cuerpoTr(e))
    msj += Plantilla.plantillaTagsTodosLosDatos.pie;

    Frontend.Article.actualizar( "Listado de jugadores/as por nombre", msj )
}

/**
 * Función que nos muestra un/a jugador/a de la base de datos
 * @param {Vector_de_persona} vector Vector con los datos de los plantilla a mostrar
 */
Plantilla.imprimeMinimoUnCriterio = function (vector) {
    let msj = "";
    msj += Plantilla.plantillaTablaPersonasTodosLosDatosSINID.cabecera;
    vector.forEach(e => msj += Plantilla.cuerpoTr(e))
    msj += Plantilla.plantillaTagsTodosLosDatos.pie;

    Frontend.Article.actualizar( "Listado de jugadores/as por mínimo un criterio", msj )
}

/**
 * Función que busca un/a jugador/a por mínimo un criterio.
 */
Plantilla.buscarPorUnCriterioMinimo = function () {
    porNombre.style.display = 'none';
    porCampo.style.display = 'none';
    porMinimoUnCriterio.style.display = 'block';
}

/**
 * Función para buscar a un/a jugador/a por mínimo un criterio.
 */
Plantilla.buscarMinimoUnCriterio = function (nombre,apellidos,nacionalidad,posicion) {
    this.recuperaPorMinimoUnCriterio(nombre,apellidos,nacionalidad,posicion,this.imprimeMinimoUnCriterio);
}

/**
 * Función que filtrará los datos de la base de datos por mínimo un criterio.
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.recuperaPorMinimoUnCriterio = async function (nombre2,apellidos2,nacionalidad2,posicion2,callBackFn) {
    let response = null

    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }
    
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        const filtro = vectorPersonas.data.filter(persona => persona.data.nombre === nombre2 || persona.data.apellidos === apellidos2 || persona.data.nacionalidad === nacionalidad2 || persona.data.posicion === posicion2);
        callBackFn(filtro)
    }
}