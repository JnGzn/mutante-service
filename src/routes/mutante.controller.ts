// importacion librerias
import express from 'express'
import { Mutante } from '../services/mutanteService/mutante.service';



export  class MutanteController {

    private mutanteService
    constructor(){
        this.mutanteService = new Mutante()
    }
    public routes(app: any){



        // EndPoint POST
        // validal el adn enviado y regresa si es mutante o no
        app.post('/mutant/', async (req : express.Request, res: express.Response) => {


            try {

                const result = await this.mutanteService.isMutant(req.body.dna)
                // Responde y funaliza la peticion
                res.status(200).json({
                    data: result,
                }).end()

                // finaliza el metodo
                return

            } catch (error) {
                console.error(`ControllerTodo -> POST /mutant:: ${JSON.stringify(error)}`)
                // Responde y funaliza la peticion
                res.status(500).json({
                    data: null,
                    err: error
                }).end()
            }
        })

    }
}