// importacion librerias
import express from 'express'
import { Mutante } from '../services/mutanteService/mutante.service';
import { schemaMutantePost } from '../validators/mutante.validator';



export  class MutanteController {

    private mutanteService
    constructor(){
        this.mutanteService = new Mutante()
    }
    public routes(app: any){

        console.log("routes");

        // EndPoint POST
        // validal el adn enviado y regresa si es mutante o no
        app.post('/mutant', async (req : express.Request, res: express.Response) => {

            console.log("MutanteController -> POST mutant: Body: "+ req.body);

            try {

                 // validacion estrutura
                 const data: any = req.body;
                 const validation = schemaMutantePost.validate(data)

                 // Si hay error en la validacion
                 if(validation.error){
                     console.error(`MutanteController -> POST mutant: error en la estructura: ${JSON.stringify(validation.error.message)}`);
                     // Responde y finaliza la peticion
                     res.status(422).json({
                         data: null,
                         err: validation.error.message
                     }).end()
                     return
                 }

                // Validacion contenido
                const dna = req.body.dna
                const cantFilas = dna.length
                for (const filaAdn of dna) {
                    const validacionLetras = filaAdn.match(/^[ATCG]+$/)
                    if(!validacionLetras || cantFilas !== filaAdn.length){
                        // Responde y funaliza la peticion
                        res.status(422).json({
                            data: null,
                            err: "Estructura del DNA no validad",
                        }).end()

                        // finaliza el metodo
                        return
                    }
                }

                const result = await this.mutanteService.isMutant(req.body.dna)
                // Responde y funaliza la peticion
                res.status(200).json({
                    data: result,
                }).end()

                // finaliza el metodo
                return

            } catch (error) {
                console.error(`MutanteConstroller -> POST /mutant:: ${JSON.stringify(error)}`)
                // Responde y funaliza la peticion
                res.status(500).json({
                    data: null,
                    err: error
                }).end()
            }
        })

        // EndPoint POST
        // validal el adn enviado y regresa si es mutante o no
        app.post('/stats', async (req : express.Request, res: express.Response) => {

            console.log("MutanteController -> GET stats: Body: "+ req.body);

            try {

                // Responde y funaliza la peticion
                res.status(200).json({
                    data: {'count_mutant_dna':40, 'count_human_dna':100, 'ratio':0.4},
                    err: null
                }).end()

                // finaliza el metodo
                return

            } catch (error) {
                console.error(`MutanteConstroller -> GET /stats:: ${JSON.stringify(error)}`)
                // Responde y funaliza la peticion
                res.status(500).json({
                    data: null,
                    err: error
                }).end()
            }
        })

    }
}