class Transaction {
    /**
     * 
     * @param {number} amount 
     * @param {string} payer 
     * @param {string} payee 
     */
    constructor(amount, payer, payee) {
        this.amount = amount,
        this.payer = payer;
        this.payee = payee;
    }

    /**
     * 
     * @returns {string} string
     */
    toString() {
        return JSON.stringify(this)
    }
}


export default Transaction;