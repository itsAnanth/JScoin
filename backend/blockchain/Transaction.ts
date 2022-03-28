import type { Transaction as IT, transactionPayload } from '../types/Transaction';

interface Transaction extends IT { };

class Transaction {
    constructor({ amount, payerID, payeeID }: transactionPayload) {
        this.amount = amount,
        this.payerID = payerID;
        this.payeeID = payeeID;
    }

    toString(): string {
        return JSON.stringify(this)
    }
}


export default Transaction;