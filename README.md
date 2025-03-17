# VoultechApp

## Development server

To start a local development server, run:

```bash
ng serve
```

## Decisiones Relevantes

# Análisis de requerimiento
Lo escencial fue analizar los requerimientos propuestos por el desafio, una ves analisados e interiorizados se eligio un tipo de sistema que mas se acomode a lo que el problema requeria. Dado que trataba de un sistema de gestion de productos se penso en la creacion de un DASHBOARD. 

Que tendria funcionalidades como: 
Visualizacion de KPIs
Gestion de productos
Gestion de notificaciones

entre otras, donde estas ultimas fueron implementadas en su primera iteracion para lograr el desafio, ademas del MVP del sistema en cuestion.

# Adición de requerimientos
Como los requerimientos se alejaban del MVP del sistema que fue seleccionado, se agregaron requerimientos asociados a :
Notificaciones
Visualizacion de KPis
# Diseño
En cuanto a diseño la inspiración fue producto a experiencias previas y sitios web con ese proposito, el listado se encuentra en figma

Cabe destacar que se penso en un DASHBOARD moderno, con gran accesibilidad y grata experiencia de usuario 
Si bien existen mejoras significativas en cuanto a estilo de modulos, es porque se hizo mas enfasis en funcionalidades, sin embargo, las siguientes iteraciones abordaran en profundidad los estilos

# Desiciones tecnicas relevantes
Se uso behaviorSubject para servicio de productos y asi mantener una vista actualizada ante cualquier evento CRUD (crear, eliminar, actualizar en este caso un producto). este metodo rxjs peermite escuchar y emitir a la ves mensajes a todos sus suscriptores, por lo que lo hace sumamente importante a la hora de abordar CRUDS

## Herramienta de diseño 
La herramienta de diseño que se utilizo fue Figma, donde el borrador se puede encontrar en :
https://www.figma.com/design/8DrECom5jF7BKnulsFHXhJ/VoultechApp?node-id=0-1&t=8bKuA44i4VqJUo02-1

## Dummy Data
En el proyecto se creo un archivo dummy.data.json para poblar localStorage y ver comportamiento del sistema, antes de acceder a las funcionalidades asociadas al CRUD de productos

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.0.


Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
