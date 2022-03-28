import * as crypto from 'crypto';
import type { Block as IBlock, blockPayload } from '../types/Block';

interface Block extends IBlock { };

class Block {
    constructor({ previousHash, transaction, timestamp = Date.now()}: blockPayload) {
        this.previousHash = previousHash;
        this.transaction = transaction;
        this.timestamp = timestamp;
        this.nonce = Math.floor(Math.random() * 999999999);
        this.hash = this.getHash();
    }

    getHash(): string {
        return crypto.createHash('sha256').update(JSON.stringify(this.transaction) + this.nonce + this.previousHash + this.timestamp).digest('hex')
    }
}


export default Block;