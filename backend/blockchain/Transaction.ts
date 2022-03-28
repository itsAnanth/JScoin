import type { Transaction as IT, transactionPayload } from '../types/Transaction';

interface Transaction extends IT { };

class Transaction {
    constructor({ amount, to, from }: transactionPayload) {
        this.amount = amount,
        this.to = to;
        this.from = from;
    }

    toString(): string {
        return JSON.stringify(this)
    }
}


export default Transaction;