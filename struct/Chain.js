import Block from "./Block.js"
import Transaction from "./Transaction.js"
import * as crypto from 'crypto';
import SHA256 from "crypto-js/sha256.js";

const genesisTransaction = new Transaction(0, 'genesisBlock', 'genesisBlock');
const genesisBlock = new Block('', genesisTransaction);

class Chain {
    #chain;
    constructor() {
        this.#chain = [genesisBlock];
    }


    /**
     * 
     * @returns {Array} Array of blocks
     */
    getChain() {
        const dupeChain = [...this.#chain];
        return dupeChain;
    }

    /**
     * 
     * @returns {Block}
     */
    lastBlock() {
        return this.#chain[this.#chain.length - 1];
    }


    /**
     * A simple proof of work system to prevent double spending
     * @param {number} nonce 
     * @returns {number}
     */
    mine(nonce) {
        let solution = 1;
        console.log('⛏️  mining...');

        while(true) {
            const secret = (nonce + solution).toString();
            const attempt = SHA256(secret).toString();

            if (attempt.substr(0, 4) === '0000') {
                console.log(`Solved: ${solution}`);
                return solution;
            }
            solution += 1;
        }
    }


    /**
     * A function to add new block to the blockchain, uses crypto.createVerify() to ensure the integrity
     * @param {Transaction} transaction 
     * @param {string} senderPublicKey 
     * @param {string} signature 
     */
    addBlock(transaction, senderPublicKey, signature) {
        const verify = crypto.createVerify('SHA256');
        verify.update(transaction.toString());

        const isValid = verify.verify(senderPublicKey, signature);
        if (isValid) {
            const newBlock = new Block(this.lastBlock().hash(), transaction);
            this.mine(newBlock.nonce);
            this.#chain.push(newBlock);
        }
    }
}


export default new Chain();