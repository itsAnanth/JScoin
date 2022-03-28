import * as crypto from 'crypto';

interface Wallet {
    keyPair: crypto.KeyPairSyncResult<string, string>;
    publicKey: string;
    privateKey: string;
}

export type { Wallet };
