
# Guía para Ejecutar el Proyecto en Local

  

Este proyecto está construido con Vue 3, TypeScript y Vite. A continuación, se detallan los pasos necesarios para ejecutar la aplicación en un entorno local.

  

## Requisitos Previos

  

Asegúrate de tener instalados los siguientes programas en tu máquina:

  

- [Node.js](https://nodejs.org/) (versión 14 o superior)

- [npm](https://www.npmjs.com/) (que se instala automáticamente con Node.js)

  

## Clonar el Repositorio

  

Primero, clona el repositorio en tu máquina local:

  

```bash

git  clone <URL_DEL_REPOSITORIO>

cd <NOMBRE_DEL_REPOSITORIO>

```

  

## Instalación de Dependencias

  

Instala las dependencias del proyecto utilizando npm:

  

```bash

npm  install

```

  

## Configuración del Entorno

  

Antes de ejecutar la aplicación, asegúrate de que el archivo `.env` esté configurado correctamente. Puedes crear un archivo `.env` en la raíz del proyecto y definir las variables necesarias, como `API_BASE_URL`.

  

## Ejecutar el Proyecto en Modo Desarrollo

  

Para iniciar la aplicación en modo desarrollo, utiliza el siguiente comando:

  

```bash

npm  run  dev

```

  

Esto iniciará un servidor de desarrollo y podrás acceder a la aplicación en `http://localhost:3000` (o el puerto que se indique en la consola).

  

## Ejecutar el Proyecto en Modo Producción

  

Para ejecutar la aplicación en modo producción, primero debes construir el proyecto. Utiliza el siguiente comando:

  

```bash

npm  run  build

```

  

Esto generará los archivos de producción en la carpeta `dist`. Para servir estos archivos, puedes usar un servidor estático. Una opción es utilizar `serve`, que puedes instalar globalmente:

  

```bash

npm  install  -g  serve

```

  

Luego, ejecuta el siguiente comando para servir la aplicación:

  

```bash

serve  -s  dist

```

  

Ahora podrás acceder a la aplicación en `http://localhost:5000` (o el puerto que se indique).

 