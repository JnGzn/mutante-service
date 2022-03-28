// importacion librerias
import express from 'express'
import { Producto } from '../services/producto/producto.service';



export  class ProductoController {

    private productoService
    constructor(){
        this.productoService = new Producto()
    }
    public routes(app: any){



        // EndPoint GET
        // obtiene el listado de productos y los retorna
        app.get('/productos', async (req : express.Request, res: express.Response) => {


            try {

                const result = await this.productoService.getProductos()
                // Responde y funaliza la peticion
                res.status(200).json({
                    data: result,
                }).end()

                // finaliza el metodo
                return

            } catch (error) {
                console.error(`ControllerTodo -> GET /productos:: ${JSON.stringify(error)}`)
                // Responde y funaliza la peticion
                res.status(500).json({
                    data: null,
                    err: error
                }).end()
            }
        })

    }
}