import Block from "./blockchain/Block";
import Chain from "./blockchain/Chain";
import Transaction from "./blockchain/Transaction";
import Wallet from "./blockchain/Wallet";
import sshpk from 'sshpk';

// const d = new Wallet();
// const bob = new Wallet();
// const chad = new Wallet();
// // bob.publicKey = d.publicKey;

// // bob.send(5000, chad.publicKey);
// chad.send(1000, bob.publicKey);

// console.log(Chain.getChain())
// console.log('bob >>', Chain.getBalanceFromKey(bob.publicKey));
// // console.log(sshpk.parseKey(bob.publicKey).toString(''));
// // console.log(bob.publicKey == sshpk.parseKey(key.key, 'ssh').toString('pem'));
// const hex = Buffer.from(bob.publicKey).toString('hex');
// console.log('hex >>', hex);
// console.log(sshpk.parseKey(Buffer.from(hex, 'hex')).toString('pem') === bob.publicKey);

import express from 'express';
import Server from './server/Server';
import cors from 'cors';
import fs from 'fs';
import multer from 'multer';

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const includeMulter = multer().any();


const my = new Wallet();
const chad = new Wallet();

fs.writeFileSync('./public.pem', my.publicKey);
fs.writeFileSync('./private.pem', my.privateKey);
fs.writeFileSync('./tosend.pem', chad.publicKey);

app.use(express.json())
app.use(cors());

app.use((req, res, next) => {
    includeMulter(req, res, next)
});


app.use(express.static('public'));

new Server(app, {
    PORT: PORT,
    methodsPath: './methods',
    autoHandle: true
});