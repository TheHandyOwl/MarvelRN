# MarvelRN

Práctica entregable de React Native contra API de Marvel.com

## Práctica

La práctica consiste en crear una aplicación con los siguientes requisitos​:

La app debe tener NECESARIAMENTE:
- Pantalla con un listado FlatList y datos cargados desde el web services
sobre la temática elegida.
- Pantalla de vista detalle al pulsar una celda del listado.
- Hacer uso de la librería Redux
- La app deberá usar uno de los componentes de navegación mostrados
en las diapositivas del curso​ (Recomendado react-native-router-flux)

OPCIONALMENTE la app puede disponer de:
- El uso de este spinner en los tiempos de carga, que tendremos que
enlazar MANUALMENTE con nuestros proyectos nativos.
https://github.com/maxs15/react-native-spinkit
- Un formulario de añadir personaje (aunque no esté conectado contra un
webservice)
- En caso de usar una API distinta o de añadir alguna funcionalidad extra,
especificar en el Read.me del repositorio.

## Instalación

1. Clonar el repositorio
2. Acceder a la carpeta que contiene el repositorio
3. Ejecutar 'npm install' para instalar las dependencias del proyecto
4. Ejecutar 'npm start' para iniciar el servidor
5. Ejecutar 'react-native run-ios' para iniciar la aplicación en el emulador iOS

## Solución

Notas adicionales:
- La rama master del repositorio es la rama principal
- Se utiliza redux
- Se utiliza react-native-router-flux
- Se utiliza el módulo 'qs' para concatenar los filtros al configurar la llamada al endpoint en 'AsyncCalls'
- La aplicación empieza con un FlatList, como vista principal, que carga el listado de personajes
- Se hace uso del spinner propuesto para la descarga inicial de personajes en la vista principal. Funciona en iOS y Android
- Se hace uso de la paginación en la vista principal, de 20 en 20, con scroll infinito hasta agotar la lista de personajes. Se activa / desactiva un spinner durante cada descarga
- Al pulsar sobre un personaje de la vista principal, se muestra la vista detalle
- En la vista detalle hay un SectionList, que muestra 'comics', 'series' y 'stories'
- La vista detalle se ha preparado para mostrar un mensaje al pulsar sobre los items del Section List, pero se deshabilita porque va lento en el simulador
- Desde la vista detalle se puede borrar el personaje, utilizando un filter para generar la lista nueva
- Se pueden añadir nuevos personajes mediante un formulario, que se accede desde un menú en la vista principal.
- Si añadimos un personaje nuevo, se guardará el primero de la lista para que se vea. Obliga a meter una foto (que es fija porque no podremos subirla a la API) y un nombre para hacer validaciones en el formulario.
- En el formulario se utiliza un label/input personalizado
- Los botones de 'Guardar' y 'Borrar' se hacen con un botones personalizados
- Se activa un 'ActivityIndicator' nativo al pulsar sobre los botones personalizados 'Guardar' y 'Borrar'. Se mostrará durante 1 segundo como respuesta al usuario para informar de una supuesta acción en segundo plano.
- Se activa un menú para obtener más información en la vista detalle, que abrirá un navegador con la información del personaje que estemos visualizando
