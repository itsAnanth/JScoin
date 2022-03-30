import { Store as IS } from '../types/Store';
import Chain from './Chain';

interface Store extends IS { };

class Store {
    constructor() {
        this.chain = new Chain();
        this.mempool = [];
        this.peers = [];
    }
}


export default new Store();