# DynamicPay Demo Site
This is a demo site.

## Antes de instalar

Necesitas obtener un token con el scope read:packages <br>
Documentación: <br> 
https://help.github.com/en/packages/publishing-and-managing-packages/about-github-packages#about-tokens


## Agregar el token

Una vez obtenido ese token, debemos ocuparlo para autenticarnos en Github packages. Para eso creamos un archivo .npmrc en el home, o sea, la ruta del archivo sería ~/.npmrc El contenido de ese archivo (reemplazando TOKEN por nuestro token) <br>
Más información: <br> 
https://develop.docs.modyo.com/guides/content/public-api-reference.html#sdk-de-liquid

`//npm.pkg.github.com/:_authToken=TOKEN`

## Instalar paquetes

En el momento en que el proyecto se creó no existía soporte de yarn para repositorios privados, así que por el momento solo se puede usar npm

`npm install`

## Levantar proyecto en local

URL test: http://0.0.0.0:3000/

`npm start`
