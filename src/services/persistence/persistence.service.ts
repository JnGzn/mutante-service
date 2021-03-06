
import { Client } from 'pg'
import fotenv from "dotenv";

// lectura configuracion .env
fotenv.config()

export class PersistenceService {

    private client: Client = new Client();
    tablaBd: string = 'mutantes'


    /**
     * Abre la conexion a la base de datos
     */
    private async abrirConexion() {
        try {
            this.client = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: {
                    rejectUnauthorized: false
                }
            });
            await this.client.connect()
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    /**
     * Inserta el registro a la base de datos
     */
    async insertAdn(adn: string[], esMutante: boolean): Promise<void> {

        try {
            await this.abrirConexion();
            const result = await this.client.query(`INSERT INTO ${this.tablaBd} (dna, esMutant) VALUES ('${JSON.stringify(adn)}', ${esMutante}) ON CONFLICT (dna) DO NOTHING `)
            this.client.end()
        } catch (error) {
            console.debug(error);
            throw error
        }
    }

    /**
     * Consulta el reporte de humanos y mutantes de la base de datos
     * Retorna Reporte consultado
     */
    async consultarReporte(): Promise<any> {

        try {
            await this.abrirConexion();
            const result = await this.client.query(`SELECT
          (SELECT COUNT(*) FROM ${this.tablaBd} WHERE esMutant = false) as humanos,
          (SELECT COUNT(*) FROM ${this.tablaBd} WHERE esMutant = true) as mutantes`)
            this.client.end()
            return result.rows[0]
        } catch (error) {
            console.debug(error)
            throw error
        }
    }
}