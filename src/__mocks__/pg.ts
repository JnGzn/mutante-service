
// mock reporte consultado
const responseConsultaBd = {
  rows: [{
    mutantes: 40,
    humanos: 100
  }]
}

let contador = 0

export class Client {
  public connect = jest.fn((llaveBd: string) =>{
    if (!contador){
      contador ++
      return Promise.reject('----TEST FALLO---')
    }
    return Promise.resolve()
  })
  public end = jest.fn(() => Promise.resolve())
  public query = jest.fn((query: string) => {

    if (query.includes('INSERT') && query.includes('true')) {
      return Promise.resolve()
    }
    else if (query.includes('INSERT') && query.includes('false')) {
      return Promise.reject('----TEST FALLO---')
    }
    if (query.includes('SELECT') && query.includes('FROM mutantes')) {
      return Promise.resolve(responseConsultaBd)
    } else {
      return Promise.reject('----TEST FALLO---')
    }

  })
}
