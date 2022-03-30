## API MUTANTE SERVICE
Valida el adn y a partir de ello se determina si es mutante o no, este resultado se guarda en una base de datos pg para luego ser consultada y sacar dicho reporte (solo se guarda un ADN en la Bd los demas los ignora)

El proyecto y la base de datos se encuentran desplegados en Heroku y esta disponible para su consumo

## Instalacion
Ejecute los siguientes comandos 

```
$ git clone https://github.com/JnGzn/mutante-service.git
$ npm i
```

## Despliegue
Ejecute el siguiente comando para desplegar en desarrollo
```
$ npm run dev
```

* Se ejecuta el servidor en ```http://localhost:3000/ ``` en el ambiente de desarrollo y queda auditando los cambios para que se vuelva a levantar automaticamente

* El dominio deonde deplegada publicamente es `https://mutante-service.herokuapp.com/`

Para la instalacion de base de datos, se debe intalar [postgresSQL](https://www.postgresql.org/), una ves ya intalada y creada una instacia se bede crear un Base de datos y crear una tabla con el siguiente [script](./src/scriptBD/script.sql)

## Pruebas unitarias

Ejecute el siguiente comando para iniciar las prubas con [Jest](https://jestjs.io/)
```
$ npm run test
```

## Variables de entorno
Crear el archivo `.env` en la raiz del proyecto basandose en [.env_example](.env_example) donde puede modificar los siguiente datos
```
PORT= (puerto en que se va a ejecutar el servidor)

DATABASE_URL= (hash de la conexion a la base de datos postgresql)
```
## Endpoint
 POST ->  /mutant/ {
“dna”:["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
}

 * GET  -> /stats


[Acá Puede ver el uso de la api y sus dos enpoint disponibilizados]( 
https://app.swaggerhub.com/apis-docs/JnGzn/mutante-api/1.0.0)

` `