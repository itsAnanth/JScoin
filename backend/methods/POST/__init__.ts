import Wallet from "../../blockchain/Wallet";
import Endpoint from "../../modules/Endpoint";
import Response from "../../modules/Response";
import sshpk from "sshpk";
import fs from 'fs';

export default new Endpoint({
    path: '/',
    callback: async(req, res, next) => {
        const amount = req.body.amount;


        if (!req.files) return;
        if (!(req.files instanceof Array)) return;



        const publicKey = sshpk.parseKey(Buffer.from(req.files[0].buffer)).toString('pem');
        const privateKey = sshpk.parsePrivateKey(Buffer.from(req.files[1].buffer)).toString('pem');
        const payeePublicKey = sshpk.parseKey(Buffer.from(req.files[2].buffer)).toString('pem');

        // console.log(publicKey, privateKey, payeePublicKey)

        //@ts-ignore
        const success = Wallet.send(amount, privateKey, publicKey, payeePublicKey);

        if (success) {
            console.log(`sent ${amount}`)
        }
    }
})