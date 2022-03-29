import { ServiceTodo } from '../app.service';

export class Mutante extends ServiceTodo {

    constructor() {
        super();
    }

    /**
     *  Valida la matiz (ADN) y valida las diferentes secuencias
     *  Guarda el adn en la base de datos
     *  Retorna true/false si es mutante o no
     */
    async isMutant(dna: string[]): Promise<boolean> {
        let contSecuencia = 0

        for (const filaDna of dna) {
            contSecuencia += this.validateColumnas(filaDna)
        }

        contSecuencia += this.validateFilas(dna)
        contSecuencia += this.validateDiagonal(dna)

        console.log("CANT MUTACIONES: "+ contSecuencia);

        const esMutante = contSecuencia > 1
        await this.persistenceService.insertAdn(dna, esMutante)

        return esMutante
    }

    /**
     *  Consulta la base de datos
     *  Retorna reporte de humanos/mutantes/ratio
     */
    async consulaReporte(): Promise<any> {

        const result = await this.persistenceService.consultarReporte()

        return {
            count_mutant_dna: result.mutantes,
            count_human_dna: result.humanos,
            ratio: result.mutantes/result.humanos
        }
    }

    /**
     *  Valida la matiz horizontalmente (derecha-izquierda)
     *  Retorna la cantidad de secuencias encontradas
     */
    private validateColumnas(fila: string): number {
        let contSeqColumnas = 0

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
                contSeqColumnas++
            }
        }

        return contSeqColumnas
    }

    /**
     *  Valida la matiz verticalmente (arriba-abajo)
     *  Retorna la cantidad de secuencias encontradas
     */
    private validateFilas(dna: string[]): number {

        let contSeqColumnas = 0
        for (let col = 0; col < dna[0].length; col++) {
            let contRepeticiones = 0
            let ultimaLetra = ''
            for (const filaDna of dna) {

                if (ultimaLetra !== filaDna[col]) {
                    ultimaLetra = filaDna[col]
                    contRepeticiones = 1
                } else {
                    contRepeticiones++
                }

                if (contRepeticiones === 4) {
                    contSeqColumnas++
                }
            }
        }

        return contSeqColumnas
    }

    /**
     *  Valida la matiz diagonalmente hacia la derecha e izquierda
     *  Retorna la cantidad de secuencias encontradas
     */
    private validateDiagonal(dna: string[]): number {

        let contSeqDiagonales = 0

        // Recorre las columnas
        for (let col = 0; col < dna[0].length; col++) {

            let cadenaDgDerecha = '' // va a ir concatenando hacia la derecha
            let cadenaDgIzq = '' // va a ir concatenando hacia la iquierda
            let esSecuenciaDer = false // flag si ya encontró una diagonal por derecha
            let esSecuenciaIzq = false  // flag si ya encontró una diagonal por izquierda

            // recorre las filas
            for (let fila = 0; fila < dna.length; fila++) {

                // proxima col a la derecha - fila abajo
                const proxColDer = col + fila
                if (proxColDer < dna[fila].length && !esSecuenciaDer) {
                    cadenaDgDerecha += dna[fila][proxColDer]
                    if (cadenaDgDerecha.length >= 4 && this.validateColumnas(cadenaDgDerecha)) {
                        contSeqDiagonales++
                        esSecuenciaDer = true
                    }
                }

                // proxima columna a la izquierda - fila abajo
                const proxColIzq = col - fila
                if (proxColIzq >= 0 && !esSecuenciaIzq) {
                    cadenaDgIzq += dna[fila][proxColIzq]
                    if (cadenaDgIzq.length >= 4 && this.validateColumnas(cadenaDgIzq)) {
                        contSeqDiagonales++
                        esSecuenciaIzq = true
                    }
                }
            }
        }

        return contSeqDiagonales

    }

}