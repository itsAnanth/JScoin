import type { Transaction } from './Transaction';

interface Block {
    previousHash: string;
    transaction: Transaction;
    timestamp: number;
    nonce: number;
    hash: string;

    getHash: () => string;
}

type blockPayload = {
    previousHash: string;
    transaction: Transaction;
    timestamp?: number;
}


export type { Block, blockPayload };
