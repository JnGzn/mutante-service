import { PersistenceService } from './../persistence/persistence.service';
import { MutanteService } from '../../services/mutanteService/mutante.service';



jest.mock('./../persistence/persistence.service')

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

const mutantService = new MutanteService()

// mock general insercion a BD
mutantService.persistenceService.insertAdn = jest.fn().mockImplementation((d: any) => Promise.resolve())

// mock general consulta a BD
mutantService.persistenceService.consultarReporte = jest.fn().mockImplementation(() => Promise.resolve(responseConsultaBd))

describe('MutanteService Service', () => {

    /**
     * Flujo isMutant
     */

    test('isMutant:> No es un mutante (secuencia solo diagonal) & guardado en BD exitoso', async done => {

        // ejecucion metodo
        try {
            const data = await mutantService.isMutant(adnMockEntrada)
            expect(data).toEqual(false)
            done()
        } catch (error) {
            expect(error).toBeFalsy()
        }

    })
    test('isMutant:> Si es un mutante (secuencia horizontal vertical) & guardado en BD exitoso', async done => {

        const adnMockEntradaLocal = [
            'ATGGGT',
            'CAGTTG',
            'TTGTAG',
            'ATTGGG',
            'CCCCTA',
            'TCACTG'
        ]
        // ejecucion metodo
        try {
            const data = await mutantService.isMutant(adnMockEntradaLocal)
            expect(data).toEqual(true)
            done()
        } catch (error) {
            expect(error).toBeFalsy()
        }

    })

    test('isMutant:> Si es un mutante (solo vertical) & guardado en BD exitoso', async done => {

        const adnMockEntradaLocal = [
            'ATGGGT',
            'CAGTTG',
            'TTGAAG',
            'ATTGGG',
            'CCCCTG',
            'TCACTG'
        ]
        // ejecucion metodo
        try {
            const data = await mutantService.isMutant(adnMockEntradaLocal)
            expect(data).toEqual(true)
            done()
        } catch (error) {
            expect(error).toBeFalsy()
        }

    })

    test('isMutant:> No es un mutante (secuencia solo diagonal) & Error guardado en BD', async done => {

        // mock fallo insert
        mutantService.persistenceService.insertAdn = jest.fn().mockImplementationOnce((d: any) => Promise.reject('----TEST FALLO---'))

        // ejecucion metodo
        try {
            const data = await mutantService.isMutant(adnMockEntrada)
            expect(data).toBeFalsy()
        } catch (error) {
            expect(error).toBeTruthy()
            done()
        }

    })

    /**
     * Flujo consulaReporte
     */
     test('consulaReporte:> Consulta exitosa', async done => {

        mutantService.persistenceService.consultarReporte = jest.fn().mockImplementationOnce((d: any) => Promise.resolve(responseConsultaBd))

        // ejecucion metodo
        try {
            const data = await mutantService.consulaReporte()
            expect(data).toEqual({
                count_mutant_dna: 40,
                count_human_dna: 100,
                ratio: 0.4
            })
            done()
        } catch (error) {
            expect(error).toBeFalsy()
        }

    })

    test('consulaReporte:> Fallo en la consulta', async done => {

        // mock fallo insert
        mutantService.persistenceService.consultarReporte = jest.fn().mockImplementationOnce((d: any) => Promise.reject('----TEST FALLO---'))

        // ejecucion metodo
        try {
            const data = await mutantService.consulaReporte()
            expect(data).toBeFalsy()
        } catch (error) {
            expect(error).toBeTruthy()
            done()
        }

    })
})