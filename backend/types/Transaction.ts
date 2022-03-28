interface Transaction {
    amount: number;
    to: string;
    from: string;
    toString: () => string;
}

type transactionPayload = {
    amount: number;
    from: string;
    to: string;
}

export type { Transaction, transactionPayload };
