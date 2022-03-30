import * as crypto from 'crypto';
import Chain from './Chain';
import Transaction from './Transaction';
import type { Wallet as IW } from '../types/Wallet';
import Store from './Store';

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

    static send(amount: number, fromPrivateKey: string, fromPublicKey: string, toPublicKey: string) {
        let signature = null;
        const transaction = new Transaction({
            amount,
            to: toPublicKey,
            from: fromPublicKey
        });

        const sign = crypto.createSign('SHA256');
        sign.update(transaction.toString()).end();

        try {
            signature = sign.sign(fromPrivateKey);
        } catch(e) {
            console.log('Filed signing\n' + e);
            return;
        }
        return Store.chain.addBlock(transaction, signature);
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
        return Store.chain.addBlock(transaction, signature);
    }
}


export default Wallet;