import Block from "./Block"
import Transaction from "./Transaction"
import * as crypto from 'crypto';
import SHA256 from "crypto-js/sha256";
import LinkedList from "./LinkedList";

const genesisTransaction = new Transaction({
    amount: 0,
    payeeID: 'gblock',
    payerID: 'gblock'
});

const genesisBlock = new Block({
    previousHash: '',
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
            const attempt = SHA256(secret).toString();

            if (attempt.substr(0, 4) === '0000') {
                console.log(`Solved: ${solution}`);
                return solution;
            }
            solution += 1;
        }
    }

    addBlock(transaction: Transaction, senderPublicKey: string, signature: NodeJS.ArrayBufferView) {
        const verify = crypto.createVerify('SHA256');
        verify.update(transaction.toString());

        const isValid = verify.verify(senderPublicKey, signature);
        if (isValid) {
            const newBlock = new Block({
                previousHash: this.lastBlock().data.hash,
                transaction
            });
            this.mine(newBlock.nonce);
            this.chain.push(newBlock);
        }
    }
}


export default new Chain();