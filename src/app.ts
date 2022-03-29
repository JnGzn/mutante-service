

// importacion de librerias
import express from 'express'
import logger from "morgan";
import { MutanteController } from './routes/mutante.controller';


export default class App {
  // atributos de la clase App
  public app: express.Application
  private rutasMutante: MutanteController

  // constructor de la clase App
  constructor() {

     // incializacion
    this.rutasMutante = new MutanteController()
    this.app = express()
    this.app.use(express.json())
    this.app.use(logger('dev'))

    // inicio routes
    this.rutasMutante.routes(this.app)

  }
}
