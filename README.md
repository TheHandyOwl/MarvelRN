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

## Solución

Se realiza la parte principal y la opcional:
- Se utiliza redux
- Se utiliza react-native-router-flux
- Hay un FlatList como vista principal que carga el listado de personajes
- Hay un SectionList en la vista detalle, mostrando 'comics', 'series' y 'stories'
- Desde la vista detalle se pueden borrar personajes, utilizando un filter para generar una lista nueva
- El borrado se hace con un botón personalizado
- Se pueden añadir nuevos personajes mediante un formulario, guardando el personaje al principio de la lista para que se vea. Obliga a meter foto (que es fija, porque no podemos subirla a la API) y nombre para validar formulario.
- En el formulario se utilizan label/input y botones personalizados
- Se hace uso del spinner propuesto para la descarga inicial de personajes en la vista principal. Funciona en iOS y Android
- Se hace uso de la paginación, con scroll infinito hasta agotar la lista de personajes en la vista principal. Se activa / desactiva un spinner durante la descarga
