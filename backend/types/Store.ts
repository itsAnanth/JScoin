import Chain from '../blockchain/Chain';

interface Store {
    chain: Chain;
    mempool: any[];
    peers: any[];
}

export type { Store };

