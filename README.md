# Best Practices - Nodejs

## Introducción

Este proyecto fue desarrollado con el objetivo de agilizar el startup mediante el uso de tecnologías y patrones de diseño elegidos por su compatibilidad, estabilidad y rendimiento. A su vez, el objetivo de esta API es la creacion de un usuario que registra a traves de un POST a MongoDB Cloud, registrandolo, una vez registrado, a la hora de iniciar sesion, se le generara un token, que de ser valido, lo podremos chequear con un get profile.

## Instructivo para la ejecucion de la API via POSTMAN o http request
1. Desde postman, consumir el servicio SignUp (Donde registramos al usuario), cargar nuevos valores ya que los de prueba se encuentran registrados
2. Consumir el segundo servicio SignIn (Donde logeamos nuestros datos que registramos), cargar los valores respectivos en el POST y enviarlos en el body los campos email y password, este servicio, nos generara un token de accesso que utilizaremos a continuacion.
3. En el tercero servicio profile, enviaremos en el header, el token generado en el punto 2 con los campos token - (el token que nos dio el servicio 2)
4. Como respuesta obtendremos nuestros datos de perfil, indicando que accedimos exitosamente, de no ser asi, se enviara un mensaje
5. Los servicios de getPost y getPhotos se acceden enviando el token en el header como en el punto 3.
6. La aplicacion en caso de enviar una ruta invalida, nos generara un json global diciendo que la URL es invalida. 

## Primeros pasos

1. Instalación
2. Primeros cambios
3. Estructura del proyecto
4. Variables de entorno
5. ESLint
6. dist
7. Librerias usadas en el proyecto
8. Heroku
9. Lista de comandos

### 1. Instalación

Es necesario contar con Nodejs (16.13.2 LTS a la fecha) y npm (6.4.11 a la fecha) instalados. 
Se puede instalar y administrar versiones con NVM: https://github.com/nvm-sh/nvm , o instalarlo a mano descomprimiendo y agregando al path y arranque de bash manualmente.

Para instalar el proyecto primero debemos descargarlo del repositorio de git. Una vez descargado se necesita acondicionarlo para ser un proyecto nuevo, el primer paso es borrar el archivo y los directorios .git para desvincularlo del repositorio actual.

Las dependencias se instalan mediante `npm install`

### 2. Primeros cambios

Es necesario cambiar el nombre de la carpeta principal por el nombre que llevará el proyecto y editar el archivo `package.json` con los nuevos detalles, en particular:

```javascript
  "name": "best-practices",
  "version": "1.0.0",
  "description": "Project example with good practices.",
  "main": "src/app.ts",
  "keywords": [
    "example"
  ],
  "author": "Hernan Tolosa",
  "license": "ISC",
  "repository", etc
  ```

### 3. Estructura del proyecto

La aplicación inicia en `app.ts` y carga las variables de entorno desde `.env` gracias a la librería dotenv. 
Una vez cargadas las variables realiza la conexión a la base de datos y registra las rutas. 
La ruta de loggeo de solicitudes y las rutas de healthcheck se instalan automáticamente. 
Las rutas de nuestra api se cargan desde las clases de routes, cada ruta apunta a un controller, los cuales ejecutan lógica de Express y pasan los objetos de dominio a la clase service. Las clases que se encuentran en service ejecutan lógica de negocio y realizan la orquestación, son las encargadas de llamar a las capas de repository cuando se realiza una consulta a la base de datos, o client cuando se llaman a servicios externos.

Por convención todas las clases `.ts` están acompañadas por otro archivo con el mismo nombre pero con la extensión `.spec.ts` que son los encargados de contener los casos de unit testing si asi fuese necesario.

		.env
		app.ts
		[routes]
    		example-routes.ts
    		example-routes.spec.ts
		[controller]
   		 	example-controller.ts
    		example-controller.spec.ts
		[service]
    		example-service.ts
    		example-service.spec.ts
		[config]
    		example-config.ts
		[libs]
    		joi.ts
    		verify-token.ts
		[models]
  			user.ts


### 4. Variables de entorno

Dependiendo de las necesidades del proyecto hay que configurar algunas variables de entorno:

Para conexión a base de datos:

``` sh

MONGODB_URI=url
```

Para configuración de seguridad y de rutas de nuestra aplicación:

``` sh
  cors=localhost, dev.localhost
```

Para servicios externos a los cuales nos necesitemos conectar:

``` sh
  ext_api_url=http://localhost:3001
```

Las clases pertenecientes a rutas y entidades se cargan dinamicamente.

Localmente se utilizan las variables definidas en .env

## 5. Eslint

El proyecto utiliza ESLint para estilo de código. Se recomienda la instalación de VS Code ESLint extension para el uso con la IDE.
Para que guarde los cambios en el estilo adecuado (auto fix) en settings.json (archivo de config de vscode) agregar

```json
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
```

## 6. dist

Para realizar pruebas locales, manualmente se puede ejecutar el comando `npm run dev` que nos generara la carpeta dist, una vez que veamos generada dicha carpeta, ctrl+c en la consola y  volvemos a correr el comando `npm run dev`

## 7. Librerias usadas en el proyecto
	- Axios
	- Bcryptjs
	- Cors
	- jsonwebtoken
	- dotenv
	- morgan
	- mongoose
	- fast-glob
	- helmet
	- Joi


## 8. Heroku

El proyecto se encuentra hosteado en heroku, dado que es un backend solo, ejecutaremos desde postman las peticiones al proyecto

POSTMAN Heroku: https://www.getpostman.com/collections/acab14d46318b0052ade


### 9. Lista de comandos

``` sh
npm run start
npm run build
npm run dev

```
