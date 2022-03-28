import * as crypto from 'crypto';
import Chain from './Chain';
import Transaction from './Transaction';
import type { Wallet as IW } from '../types/Wallet';

interface Wallet extends IW { };

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

    send(amount: number, toPublicKey: string) {
        let signature = null;
        const transaction = new Transaction({
            amount,
            to: toPublicKey,
            from: this.publicKey
        });

        const sign = crypto.createSign('SHA256');
        sign.update(transaction.toString()).end();

        try {
            signature = sign.sign(this.privateKey);
        } catch(e) {
            console.log('Filed signing\n' + e);
            return;
        }
        Chain.addBlock(transaction, signature);
    }
}


export default Wallet;