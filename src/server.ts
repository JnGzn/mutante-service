// importacion librerias
import App from './app'
import fotenv from "dotenv";

// lectura configuracion .env
fotenv.config()

const port = process.env.SERVER_PORT || 3000
// Instancia de la clase App
const objApp = new App()

// Inicializacion HTTP
objApp.app.listen(port, () => {
    console.log(`Se esta corriendo el servidor en el puerto ${port}`)
})
// app.listen(3000)