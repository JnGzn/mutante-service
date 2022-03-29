import { ServiceTodo } from '../app.service';

export class MutanteService extends ServiceTodo {

    constructor() {
        super();
    }

    /**
     *  Valida la matiz (ADN) y valida las diferentes secuencias
     *  Guarda el adn en la base de datos
     *  Retorna true/false si es mutante o no
     */
    async isMutant(dna: string[]): Promise<boolean> {

        try {
            let contSecuencia = 0

            for (const filaDna of dna) {
                contSecuencia += this.validateColumnas(filaDna)
                // if para que cuente solo uno horizontalmente
                if(contSecuencia){
                    console.debug(`MutanteService:validateFilas :fila con secuenciaVertical ${filaDna}`)

                    break
                }
            }

            contSecuencia += this.validateFilas(dna)
            contSecuencia += this.validateDiagonal(dna)

            console.debug(`MutanteService:isMutant :cantidad de secuencias ${contSecuencia}`);

            const esMutante = contSecuencia > 1
            await this.persistenceService.insertAdn(dna, esMutante)

            return esMutante
        } catch (error) {
            console.debug(`MutanteService:isMutant :Error ${JSON.stringify(error)}`)
            throw new Error('Internal_server_error')
        }


    }

    /**
     *  Consulta la base de datos
     *  Retorna reporte de humanos/mutantes/ratio
     */
    async consulaReporte(): Promise<any> {
        try {
            // lamado a persistencia
            const result = await this.persistenceService.consultarReporte()

            return {
                count_mutant_dna: result.mutantes,
                count_human_dna: result.humanos,
                ratio: result.mutantes / result.humanos
            }
        } catch (error) {
            console.debug(`MutanteService:isMutant :Error ${JSON.stringify(error)}`)
            throw new Error('Internal_server_error')
        }
    }

    /**
     *  Valida la matiz horizontalmente (derecha-izquierda)
     *  Retorna la cantidad de secuencias encontradas
     */
    private validateColumnas(fila: string): number {
        // let contSeqColumnas = 0

        const letras = fila.split('')

        let contRepeticiones = 0
        let ultimaLetra = ''

        for (const letra of letras) {
            if (ultimaLetra !== letra) {
                ultimaLetra = letra
                contRepeticiones = 1
            } else {
                contRepeticiones++
            }
            if (contRepeticiones === 4) {
                return 1 // Unicamente valida una horizontal
                // contSeqColumnas++
            }
        }

        return 0
    }

    /**
     *  Valida la matiz verticalmente (arriba-abajo)
     *  Retorna la cantidad de secuencias encontradas
     */
    private validateFilas(dna: string[]): number {

        // let contSeqColumnas = 0
        for (let col = 0; col < dna[0].length; col++) {
            let contRepeticiones = 0
            let ultimaLetra = ''
            let secuencia = ''
            for (const filaDna of dna) {

                if (ultimaLetra !== filaDna[col]) {
                    ultimaLetra = filaDna[col]
                    contRepeticiones = 1
                    secuencia = ultimaLetra
                } else {
                    contRepeticiones++
                    secuencia +=  filaDna[col]
                }

                if (contRepeticiones === 4) {
                    console.debug(`MutanteService:validateFilas :secuenciaVertical ${secuencia}`)
                    // contSeqColumnas++
                    return 1 // unicamente retorna una coincidencia
                }
            }
        }

        return 0
    }

    /**
     *  Valida la matiz diagonalmente hacia la derecha e izquierda
     *  Retorna la cantidad de secuencias encontradas
     */
    private validateDiagonal(dna: string[]): number {

        // let contSeqDiagonales = 0

        // Recorre las columnas
        for (let col = 0; col < dna[0].length; col++) {

            let cadenaDgDerecha = '' // va a ir concatenando hacia la derecha
            let cadenaDgIzq = '' // va a ir concatenando hacia la iquierda
            // let esSecuenciaDer = false // flag si ya encontró una diagonal por derecha
            // let esSecuenciaIzq = false  // flag si ya encontró una diagonal por izquierda

            // recorre las filas
            for (let fila = 0; fila < dna.length; fila++) {

                // proxima col a la derecha - fila abajo
                const proxColDer = col + fila
                if (proxColDer < dna[fila].length) {
                    cadenaDgDerecha += dna[fila][proxColDer]
                    if (cadenaDgDerecha.length >= 4 && this.validateColumnas(cadenaDgDerecha)) {
                        console.debug(`MutanteService:validateDiagonal :secuenciaDiagonal ${cadenaDgDerecha}`)

                        return 1 // unicamente retorna una coincidencia
                        // esSecuenciaDer = true
                    }
                }

                // proxima columna a la izquierda - fila abajo
                const proxColIzq = col - fila
                if (proxColIzq >= 0) {
                    cadenaDgIzq += dna[fila][proxColIzq]
                    if (cadenaDgIzq.length >= 4 && this.validateColumnas(cadenaDgIzq)) {
                        // contSeqDiagonales++
                        // esSecuenciaIzq = true
                        return 1 // unicamente retorna una coincidencia
                    }
                }
            }
        }

        return 0

    }

}