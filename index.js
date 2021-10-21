import Chain from "./struct/Chain.js";
import Wallet from "./struct/Wallet.js";


const bob = new Wallet();
const chad = new Wallet();

bob.send(5000, chad.publicKey);
chad.send(1000, bob.publicKey);

console.log(Chain.getChain())
// Chain.getChain()[0] = 1;
// console.log(Chain.getChain())

// console.log(bob.publicKey, chad.publicKey)