import * as crypto from 'crypto';
import Chain from './Chain.js';
import Transaction from './Transaction.js';



class Wallet {
    
    constructor() {
        this.keyPair = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
        });
        this.publicKey = this.keyPair.publicKey;
        this.privateKey = this.keyPair.privateKey;
    }

    /**
     * 
     * @param {number} amount 
     * @param {string} payeePublicKey 
     */
    send(amount, payeePublicKey) {
        const transaction = new Transaction(amount, this.publicKey, payeePublicKey);

        const sign = crypto.createSign('SHA256');
        sign.update(transaction.toString()).end();

        const signature = sign.sign(this.privateKey);
        Chain.addBlock(transaction, this.publicKey, signature);
    }
}


export default Wallet;