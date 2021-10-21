import * as crypto from 'crypto';
import Transaction from './Transaction.js';
import SHA256 from 'crypto-js/sha256.js';

class Block {

    /**
     * 
     * @param {string} previousHash 
     * @param {Trans} transaction 
     * @param {Transaction} time 
     */
    constructor(previousHash, transaction, time = Date.now()) {
        this.previousHash = previousHash;
        this.transaction = transaction;
        this.time = time;
        this.nonce = Math.floor(Math.random() * 999999999);
    }


    /**
     * 
     * @returns {string}
     */
    hash() {
        const block = JSON.stringify(this);
        const hash = SHA256(block).toString();
        return hash;
    }
}


export default Block;