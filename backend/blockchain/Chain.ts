import Block from "./Block"
import Transaction from "./Transaction"
import * as crypto from 'crypto';
import LinkedList from "./LinkedList";

const genesisTransaction = new Transaction({
    amount: 0,
    to: 'gblock',
    from: 'gblock'
});

const genesisBlock = new Block({
    previousHash: crypto.createHash('sha256').update('genesisBlock').digest('hex'),
    transaction: genesisTransaction
});

class Chain {
    private chain = new LinkedList();
    constructor() {
        this.chain.push(genesisBlock);
    }

    getChain() {
        return this.chain.toArray();
    }

    lastBlock() {
        return this.chain.lastNode();
    }

    mine(nonce: number) {
        let solution = 1;
        console.log('⛏️  mining...');

        while(true) {
            const secret = (nonce + solution).toString();
            // const attempt = SHA256(secret).toString();
            const attempt = crypto.createHash('sha256').update(secret).digest('hex');

            if (attempt.substr(0, 4) === '0000') {
                console.log(`Solved: ${solution}`);
                return solution;
            }
            solution += 1;
        }
    }

    addBlock(transaction: Transaction, signature: NodeJS.ArrayBufferView) {
        let isValid = false;
        const verify = crypto.createVerify('SHA256');
        verify.update(transaction.toString());

        try {
            isValid = verify.verify(transaction.from, signature);
        } catch(e) {
            console.log('Invalid transaction [public key not valid]');
            return;
        }
        if (isValid) {
            const newBlock = new Block({
                previousHash: this.lastBlock().data.hash,
                transaction
            });
            this.mine(newBlock.nonce);
            this.chain.push(newBlock);
        } else {
            console.log('!!! not a valid transaction')
        }
    }

    getBalanceFromKey(publicKey: string) {
        let balance = 0;
        const chain = this.getChain();

        for (let i = 0; i < chain.length; i++) {
            const transaction = chain[i].transaction;
            if (transaction.to === publicKey)
                balance += transaction.amount;
            else if (transaction.from === publicKey)
                balance -= transaction.amount;

            return balance;                
        }
    }
}


export default new Chain();