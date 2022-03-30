import { PersistenceService } from './persistence.service';
// import { Client } from 'pg'
jest.mock('pg')


// mock de adn a validar
const adnMockEntrada = [
    'ATGGGA',
    'CAGTGC',
    'TTATAT',
    'AGGAGG',
    'CCACTA',
    'TCACTG'
]

// mock reporte consultado
const responseConsultaBd = {
    mutantes: 40,
    humanos: 100
}

const persistenceService = new PersistenceService()

describe('PersistenceService', () => {

    /**
     * Flujo insertAdn
     */

     test('insertAdn:> Fallo en Apertura conexion', async done => {

        // ejecucion metodo
        try {
            const data = await persistenceService.insertAdn(adnMockEntrada, false)
            expect(data).toBeUndefined()
        } catch (error) {
            expect(error).toBeTruthy()
            done()
        }

    })

    test('insertAdn:> Insercion Correcta', async done => {

        // ejecucion metodo
        try {
            const data = await persistenceService.insertAdn(adnMockEntrada, true)
            expect(data).toBeUndefined()
            done()
        } catch (error) {
            expect(error).toBeFalsy()
        }

    })
    test('insertAdn:> Fallo en Insercion', async done => {

        // ejecucion metodo
        try {
            const data = await persistenceService.insertAdn(adnMockEntrada, false)
            expect(data).toBeUndefined()
        } catch (error) {
            expect(error).toBeTruthy()
            done()
        }

    })
    test('insertAdn:> consulta Correcta', async done => {

        // ejecucion metodo
        try {
            const data = await persistenceService.consultarReporte()
            expect(data).toEqual(responseConsultaBd)
            done()
        } catch (error) {
            expect(error).toBeFalsy()
        }

    })
    test('insertAdn:> fallo en Consulta', async done => {

        // ejecucion metodo
        try {
            persistenceService.tablaBd = ''
            const data = await persistenceService.consultarReporte()
            expect(data).toBeFalsy()
        } catch (error) {
            expect(error).toBeTruthy()
            done()
        }

    })

})