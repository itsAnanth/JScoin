import SHA256 from 'crypto-js/sha256.js';
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
        const block = JSON.stringify(this);
        const hash = SHA256(block).toString();
        return hash;
    }
}


export default Block;