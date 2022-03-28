interface Transaction {
    amount: number;
    payerID: string;
    payeeID: string;
    toString: () => string;
}

type transactionPayload = {
    amount: number;
    payerID: string;
    payeeID: string;
}

export type { Transaction, transactionPayload };
