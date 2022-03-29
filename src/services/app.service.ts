import { PersistenceService } from './persistence/persistence.service';

export  class ServiceTodo {

    persistenceService: PersistenceService;

    // Constructor Clase ServiceTodo
    constructor(){
        this.persistenceService = new PersistenceService()
    }

}