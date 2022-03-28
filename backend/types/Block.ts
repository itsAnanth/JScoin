interface Block {
    previousHash: string;
    transaction: any;
    timestamp: number;
    nonce: number;

    hash: () => string;
}

type blockPayload = {
    previousHash: string;
    transaction: any;
    timestamp?: number;
}


export type { Block, blockPayload };
