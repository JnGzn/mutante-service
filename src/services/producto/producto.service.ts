import axios, { AxiosResponse } from "axios";
import { ServiceTodo } from '../app.service';
import { ProductoData } from '../../models/producto.model';


export class Producto extends ServiceTodo{

    private producto: ProductoData

    constructor(){
        super();
        this.producto = new ProductoData()
    }

    /**
     * Modifica el todo enviado, es importante tener el Id del todo
     * @param {todo} todo:  todo a modificar
     * @returns todo modificado
     */
    async getProductos() :Promise<ProductoData> {
        // some
        return this.producto
    }
}