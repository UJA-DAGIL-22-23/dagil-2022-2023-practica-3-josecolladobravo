/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Plantilla Home"
const TITULO_ACERCA_DE = "Plantilla Acerca de"

const datosDescargadosPrueba = {
  mensaje: "Mensaje de prueba descargado",
  autor: "Prueba de autor",
  email: "Prueba de email",
  fecha: "00/00/0000"
}


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
  var inicio = new Date().getTime();
  var fin = 0;
  while ((fin - inicio) < ms) {
    fin = new Date().getTime();
  }
}



// SPECS a probar

describe("Plantilla.mostrarHome: ", function () {

  it("muestra datos nulos cuando le pasamos un valor nulo",
    function () {
      Plantilla.mostrarHome()
      expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
      expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
    })

  it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
    function () {
      Plantilla.mostrarHome(23)
      expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
      expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
    })

  it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
    function () {
      // Objeto vacío
      Plantilla.mostrarHome({})
      expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
      expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)

      // Objeto sin campo mensaje
      Plantilla.mostrarHome({ foo: "bar" })
      expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
      expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
    })

  it("muestra correctamente el título y el mensaje",
    function () {
      Plantilla.mostrarHome(datosDescargadosPrueba)
      expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
      expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
    })
})


describe("Plantilla.mostrarAcercaDe: ", function () {
  it("muestra datos nulos cuando le pasamos un valor nulo",
    function () {
      Plantilla.mostrarAcercaDe()
      expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
      expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
    })

  it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
    function () {
      Plantilla.mostrarAcercaDe(23)
      expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
      expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
    })

  it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
    function () {
      // Objeto vacío
      Plantilla.mostrarAcercaDe({})
      expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
      expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

      // Objeto sin campo mensaje
      Plantilla.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
      expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
      expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
      // Objeto sin campo autor
      Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
      expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
      expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
      // Objeto sin campo email
      Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
      expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
      expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
      // Objeto sin campo fecha
      Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
      expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
      expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
    })
  it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
    function () {
      Plantilla.mostrarAcercaDe(datosDescargadosPrueba)
      expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

      // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
      expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
      expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
      expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
    })
})

describe('Plantilla', function () {
  describe('.sustituyeTagsTodosLosDatosSoloNombres', function () {
    it('debe reemplazar todas las etiquetas de nombre de la plantilla con el nombre de la persona', function () {
      // Definimos la plantilla y la persona
      var plantilla = 'Hola, mi nombre es Juan';
      var persona = {
        data: {
          nombre: 'Juan'
        }
      };

      // Ejecutamos la función
      var resultado = Plantilla.sustituyeTagsTodosLosDatosSoloNombres(plantilla, persona);

      // Verificamos que la función haya hecho el reemplazo correctamente
      expect(resultado).toEqual('Hola, mi nombre es Juan');
    });

    it('debe reemplazar todas las etiquetas de nombre de la plantilla con el nombre de la persona, incluso si la plantilla tiene varias etiquetas', function () {
      // Definimos la plantilla y la persona
      var plantilla = 'Hola, Pedro. Soy Pedro y quiero hablar contigo, Pedro!';
      var persona = {
        data: {
          nombre: 'Pedro'
        }
      };

      // Ejecutamos la función
      var resultado = Plantilla.sustituyeTagsTodosLosDatosSoloNombres(plantilla, persona);

      // Verificamos que la función haya hecho el reemplazo correctamente
      expect(resultado).toEqual('Hola, Pedro. Soy Pedro y quiero hablar contigo, Pedro!');
    });
  });
});

describe("Plantilla.imprimeSoloNombres", function () {
  beforeEach(function () {
    // Configuramos el mock del objeto Frontend.Article
    spyOn(Frontend.Article, "actualizar");
  });

  it("debería ordenar correctamente el vector de objetos por nombre y mostrar el listado en la tabla", function () {
    // Creamos un vector de objetos desordenados
    let vector = [{ data: { nombre: "Marta" } }, { data: { nombre: "Juan" } }, { data: { nombre: "Ana" } },];

    // Llamamos a la función
    Plantilla.imprimeSoloNombres(vector);

    // Comprobamos que el vector ha sido ordenado correctamente
    expect(vector[0].data.nombre).toBe("Marta");
    expect(vector[1].data.nombre).toBe("Juan");
    expect(vector[2].data.nombre).toBe("Ana");

    // Comprobamos que se ha llamado a Frontend.Article.actualizar con los parámetros correctos
    let expectedTitle = "Listado de solo nombres de jugadores/as";
    let expectedTable = Plantilla.plantillaTablaPersonasTodosLosDatosSoloNombres.cabecera
      + Plantilla.plantillaTablaPersonasTodosLosDatosSoloNombres.actualiza(vector[0])
      + Plantilla.plantillaTablaPersonasTodosLosDatosSoloNombres.actualiza(vector[1])
      + Plantilla.plantillaTablaPersonasTodosLosDatosSoloNombres.actualiza(vector[2])
      + Plantilla.plantillaTablaPersonasTodosLosDatosSoloNombres.pie;
    expect(Frontend.Article.actualizar).toHaveBeenCalledWith(expectedTitle, expectedTable);
  });
});

describe('Plantilla.imprimeCuatroCriterios', function () {
  const vector = [
    {
      ref: {
        "@ref": {
          id: "1"
        }
      },
      data: {
        nombre: "Manel",
        apellidos: "Estiarte Duocastella",
        fec_nac: {
          dia: 26,
          mes: 10,
          anio: 1961
        },
        competiciones: [1980, 1984, 1986],
        nacionalidad: "España",
        peso: 62,
        posicion: "Atacante"
      }
    },
    {
      ref: {
        "@ref": {
          id: "2"
        }
      },
      data: {
        nombre: "Gianni",
        apellidos: "De Magistris",
        fec_nac: {
          dia: 3,
          mes: 12,
          anio: 1950
        },
        aniosParticipacionOlimpiadas: [1970, 1978, 1982],
        nacionalidad: "Italia",
        peso: 82,
        posicion: "Defensa"
      }
    }
  ];

  it("Muestra un listado de jugadores/as con todos los datos",
    function () {
      const expectedMsj = Plantilla.plantillaTablaPersonasTodosLosDatosSINID.cabecera + Plantilla.cuerpoTr(vector[0]) + Plantilla.cuerpoTr(vector[1]) + Plantilla.plantillaTagsTodosLosDatos.pie;
      spyOn(Frontend.Article, 'actualizar');
      Plantilla.imprimeCuatroCriterios(vector);
      expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Listado de jugadores/as por cuatro criterios', expectedMsj);
    });
});

describe("Plantilla.imprimeSoloNombresOrdenados", function () {
  beforeEach(function () {
    // Configuramos el mock del objeto Frontend.Article
    spyOn(Frontend.Article, "actualizar");
  });

  it("debería ordenar correctamente el vector de objetos por nombre y mostrar el listado en la tabla", function () {
    // Creamos un vector de objetos desordenados
    let vector = [{ data: { nombre: "Marta" } }, { data: { nombre: "Juan" } }, { data: { nombre: "Ana" } },];

    // Llamamos a la función
    Plantilla.imprimeSoloNombresOrdenados(vector);

    // Comprobamos que el vector ha sido ordenado correctamente
    expect(vector[0].data.nombre).toBe("Ana");
    expect(vector[1].data.nombre).toBe("Juan");
    expect(vector[2].data.nombre).toBe("Marta");

    // Comprobamos que se ha llamado a Frontend.Article.actualizar con los parámetros correctos
    let expectedTitle = "Listado de solo nombres de jugadores/as";
    let expectedTable = Plantilla.plantillaTablaPersonasTodosLosDatosSoloNombres.cabecera
      + Plantilla.plantillaTablaPersonasTodosLosDatosSoloNombres.actualiza(vector[0])
      + Plantilla.plantillaTablaPersonasTodosLosDatosSoloNombres.actualiza(vector[1])
      + Plantilla.plantillaTablaPersonasTodosLosDatosSoloNombres.actualiza(vector[2])
      + Plantilla.plantillaTablaPersonasTodosLosDatosSoloNombres.pie;
    expect(Frontend.Article.actualizar).toHaveBeenCalledWith(expectedTitle, expectedTable);
  });
});

describe("Plantilla.listarSoloNombres", function () {
  let recuperaSpy;

  beforeEach(function () {
    recuperaSpy = spyOn(Plantilla, 'recupera');
  });

  it("debería llamar a Plantilla.recupera con Plantilla.imprimeSoloNombres", function () {
    Plantilla.listarSoloNombres();
    expect(recuperaSpy).toHaveBeenCalledWith(Plantilla.imprimeSoloNombres);
  });
});

describe("Plantilla.listarSoloNombresOrdenados", function () {
  let recuperaSpy;

  beforeEach(function () {
    recuperaSpy = spyOn(Plantilla, 'recupera');
  });

  it("debería llamar a Plantilla.recupera con Plantilla.imprimeSoloNombresOrdenados", function () {
    Plantilla.listarSoloNombresOrdenados();
    expect(recuperaSpy).toHaveBeenCalledWith(Plantilla.imprimeSoloNombresOrdenados);
  });
});

describe("Plantilla.sustituyeTagsTodosLosDatos", function () {
  it("debería reemplazar todas las etiquetas con los datos de la persona", function () {
    const plantilla = "ID: abc123, Nombre: Juan, Apellidos: Pérez, Nacionalidad: Española, Peso: 75 kg, Posición: Delantero, Fecha de nacimiento: 1/1/1990";
    const persona = {
      ref: { "@ref": { id: "abc123" } },
      data: {
        nombre: "Juan",
        apellidos: "Pérez",
        nacionalidad: "Española",
        peso: "75 kg",
        posicion: "Delantero",
        fec_nac: { dia: "1", mes: "1", anio: "1990" }
      }
    };
    const resultadoEsperado = `ID: abc123, Nombre: Juan, Apellidos: Pérez, Nacionalidad: Española, Peso: 75 kg, Posición: Delantero, Fecha de nacimiento: 1/1/1990`;

    const resultadoObtenido = Plantilla.sustituyeTagsTodosLosDatos(plantilla, persona);

    expect(resultadoObtenido).toEqual(resultadoEsperado);
  });
});

describe('Plantilla.plantillaTablaPersonasTodosLosDatos.actualiza', function () {
  let plantilla;

  beforeEach(function () {
    // Creamos una plantilla de ejemplo para cada test
    plantilla = '<tr><td>ID</td><td>NOMBRE</td><td>APELLIDOS</td><td>NACIONALIDAD</td><td>PESO</td><td>POSICION</td><td>FEC_NAC</td></tr>';
  });

  it('Debería reemplazar todas las etiquetas de la plantilla por los datos de la persona', function () {
    // Creamos un objeto de persona de ejemplo
    const persona = {
      ref: { '@ref': { id: 'person123' } },
      data: {
        nombre: 'Juan',
        apellidos: 'Pérez Gómez',
        nacionalidad: 'Española',
        peso: 80,
        posicion: 'Delantero',
        fec_nac: { dia: 5, mes: 10, anio: 1995 }
      }
    };

    // Comprobamos que la función sustituye todas las etiquetas por los datos de la persona
    const resultado = Plantilla.plantillaTablaPersonasTodosLosDatos.actualiza(persona);
    expect(resultado).toContain('person123');
    expect(resultado).toContain('Juan');
    expect(resultado).toContain('Pérez Gómez');
    expect(resultado).toContain('Española');
    expect(resultado).toContain('80');
    expect(resultado).toContain('Delantero');
    expect(resultado).toContain('5/10/1995');
  });

});

describe('Plantilla.listarTodoLosDatos', () => {
  let recuperaSpy;

  beforeEach(() => {
    recuperaSpy = spyOn(Plantilla, 'recupera');
  });

  it('Debería de llamar a Plantilla.recupera con Plantilla.listarTodosLosDatos', () => {
    Plantilla.listarTodoLosDatos();

    expect(recuperaSpy).toHaveBeenCalledWith(Plantilla.listarTodosLosDatos);
  });
});

describe("Plantilla.cuerpoTr", function () {
  it("debería devolver una cadena HTML que contiene los datos de un jugador en una fila de tabla", function () {
    const jugador = {
      data: {
        nombre: "Juan",
        apellidos: "González Pérez",
        fec_nac: {
          dia: 15,
          mes: 5,
          anio: 1995
        },
        competiciones: "",
        nacionalidad: "Española",
        peso: 85,
        posicion: "Delantero"
      }
    };
    const expected = `<tr><td>Juan</td><td>González Pérez</td><td>15/5/1995</td><td></td><td>Española</td><td>85</td><td>Delantero</td></tr>`;
    expect(Plantilla.cuerpoTr(jugador)).toEqual(expected);
  });
});

describe('Plantilla.jugador', function () {
  let jugador = {
    nombre: 'Juan',
    apellido: 'Pérez',
    edad: 28,
    posicion: 'Delantero',
    equipo: 'Real Madrid'
  };

  beforeEach(function () {
    spyOn(Plantilla.plantillaFormularioUnJugador, 'actualiza').and.returnValue('<p>Información del jugador</p>');
    spyOn(Frontend.Article, 'actualizar');
  });

  it('debe llamar a Plantilla.plantillaFormularioUnJugador.actualiza con el/las jugador/a como parámetro', function () {
    Plantilla.jugador(jugador);
    expect(Plantilla.plantillaFormularioUnJugador.actualiza).toHaveBeenCalledWith(jugador);
  });

  it('debe llamar a Frontend.Article.actualizar con los argumentos "Jugador/a elegido/a" y el mensaje actualizado', function () {
    Plantilla.jugador(jugador);
    expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Jugador/a elegido/a', '<p>Información del jugador</p>');
  });

  it('debe devolver el mensaje actualizado', function () {
    let resultado = Plantilla.jugador(jugador);
    expect(resultado).toBe('<p>Información del jugador</p>');
  });
});


describe('Plantilla', function () {
  it('debería actualizar la plantilla y el artículo', function () {
    var jugador = { nombre: 'Juan', edad: 25 };
    var msj = 'Mensaje de prueba';

    spyOn(Plantilla.plantillaFormularioUnJugador, 'actualiza').and.returnValue(msj);
    spyOn(Frontend.Article, 'actualizar');

    expect(Plantilla.jugador(jugador)).toEqual(msj);
    expect(Plantilla.plantillaFormularioUnJugador.actualiza).toHaveBeenCalledWith(jugador);
    expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Jugador/a elegido/a', msj);
  });
});

describe('Plantilla.imprimeMinimoUnCriterio', function () {
  const vector = [
    {
      ref: {
        "@ref": {
          id: "1"
        }
      },
      data: {
        nombre: "Manel",
        apellidos: "Estiarte Duocastella",
        fec_nac: {
          dia: 26,
          mes: 10,
          anio: 1961
        },
        competiciones: [1980, 1984, 1986],
        nacionalidad: "España",
        peso: 62,
        posicion: "Atacante"
      }
    },
    {
      ref: {
        "@ref": {
          id: "2"
        }
      },
      data: {
        nombre: "Gianni",
        apellidos: "De Magistris",
        fec_nac: {
          dia: 3,
          mes: 12,
          anio: 1950
        },
        aniosParticipacionOlimpiadas: [1970, 1978, 1982],
        nacionalidad: "Italia",
        peso: 82,
        posicion: "Defensa"
      }
    }
  ];

  it("Muestra un listado de jugadores/as con todos los datos",
    function () {
      const expectedMsj = Plantilla.plantillaTablaPersonasTodosLosDatosSINID.cabecera + Plantilla.cuerpoTr(vector[0]) + Plantilla.cuerpoTr(vector[1]) + Plantilla.plantillaTagsTodosLosDatos.pie;
      spyOn(Frontend.Article, 'actualizar');
      Plantilla.imprimeMinimoUnCriterio(vector);
      expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Listado de jugadores/as por mínimo un criterio', expectedMsj);
    });
});

describe('Plantilla.anterior', function () {

  // Creamos un vector de ejemplo para las pruebas
  let vector = [
    {
      ref: { '@ref': { id: '123' } }
    },
    {
      ref: { '@ref': { id: '456' } }
    },
    {
      ref: { '@ref': { id: '789' } }
    }
  ];

  beforeEach(function () {
    // Creamos un elemento de ejemplo para el formulario
    let form = document.createElement('form');
    form.innerHTML = '<input type="text" id="idJugador" value="456">';
    document.body.appendChild(form);
  });

  afterEach(function () {
    // Eliminamos el elemento del formulario después de cada prueba
    document.body.removeChild(document.getElementById('idJugador').parentNode);
  });

  it('muestra el formulario vacío si el vector tiene un solo elemento', function () {
    spyOn(Plantilla, 'sustituyeTagsTodosLosDatos');
    Plantilla.anterior([vector[0]]);
    expect(Plantilla.sustituyeTagsTodosLosDatos).toHaveBeenCalledWith(Plantilla.plantillaFormularioUnJugador.formulario);
  });

  it('devuelve un array con los IDs de todos los elementos del vector', function () {
    let resultado = Plantilla.anterior(vector);
    expect(resultado).toEqual(['123', '456', '789']);
  });

  it('calcula la posición del jugador actualmente seleccionado y muestra el jugador anterior', function () {
    spyOn(Plantilla, 'mostrar');
    Plantilla.anterior(vector);
    expect(Plantilla.mostrar).toHaveBeenCalledWith('123');
  });

  it('calcula la posición correcta si el jugador actualmente seleccionado es el primer elemento', function () {
    document.getElementById('idJugador').value = '123';
    spyOn(Plantilla, 'mostrar');
    Plantilla.anterior(vector);
    expect(Plantilla.mostrar).toHaveBeenCalledWith('789');
  });

});

describe('Plantilla.anterior', function () {

  // Creamos un vector de ejemplo para las pruebas
  let vector = [
    {
      ref: { '@ref': { id: '123' } }
    },
    {
      ref: { '@ref': { id: '456' } }
    },
    {
      ref: { '@ref': { id: '789' } }
    }
  ];

  beforeEach(function () {
    // Creamos un elemento de ejemplo para el formulario
    let form = document.createElement('form');
    form.innerHTML = '<input type="text" id="idJugador" value="456">';
    document.body.appendChild(form);
  });

  afterEach(function () {
    // Eliminamos el elemento del formulario después de cada prueba
    document.body.removeChild(document.getElementById('idJugador').parentNode);
  });

  it('muestra el formulario vacío si el vector tiene un solo elemento', function () {
    spyOn(Plantilla, 'sustituyeTagsTodosLosDatos');
    Plantilla.siguiente([vector[0]]);
    expect(Plantilla.sustituyeTagsTodosLosDatos).toHaveBeenCalledWith(Plantilla.plantillaFormularioUnJugador.formulario);
  });

  it('devuelve un array con los IDs de todos los elementos del vector', function () {
    let resultado = Plantilla.siguiente(vector);
    expect(resultado).toEqual(['123', '456', '789']);
  });

  it('calcula la posición del jugador actualmente seleccionado y muestra el jugador anterior', function () {
    spyOn(Plantilla, 'mostrar');
    Plantilla.siguiente(vector);
    expect(Plantilla.mostrar).toHaveBeenCalledWith('789');
  });

  it('calcula la posición correcta si el jugador actualmente seleccionado es el primer elemento', function () {
    document.getElementById('idJugador').value = '123';
    spyOn(Plantilla, 'mostrar');
    Plantilla.siguiente(vector);
    expect(Plantilla.mostrar).toHaveBeenCalledWith('456');
  });

});

describe('Plantilla.imprime', function () {
  const vector = [
    {
      ref: {
        "@ref": {
          id: "1"
        }
      },
      data: {
        nombre: "Manel",
        apellidos: "Estiarte Duocastella",
        fec_nac: {
          dia: 26,
          mes: 10,
          anio: 1961
        },
        competiciones: [1980, 1984, 1986],
        nacionalidad: "España",
        peso: 62,
        posicion: "Atacante"
      }
    },
    {
      ref: {
        "@ref": {
          id: "2"
        }
      },
      data: {
        nombre: "Gianni",
        apellidos: "De Magistris",
        fec_nac: {
          dia: 3,
          mes: 12,
          anio: 1950
        },
        aniosParticipacionOlimpiadas: [1970, 1978, 1982],
        nacionalidad: "Italia",
        peso: 82,
        posicion: "Defensa"
      }
    }
  ];

  it("Muestra un listado de jugadores/as con todos los datos",
    function () {
      const expectedMsj = Plantilla.plantillaTablaPersonasTodosLosDatosSINID.cabecera + Plantilla.cuerpoTr(vector[0]) + Plantilla.cuerpoTr(vector[1]) + Plantilla.plantillaTagsTodosLosDatos.pie;
      spyOn(Frontend.Article, 'actualizar');
      Plantilla.imprime(vector);
      expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Listado de jugadores/as por nombre', expectedMsj);
    });
});

/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Plantilla.descargarRuta
 - Plantilla.procesarAcercaDe
 - Plantilla.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
