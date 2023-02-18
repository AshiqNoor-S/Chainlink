import { create } from 'ipfs-http-client';
import fs from 'fs';
// // Login to infura.io and go to IPFS to create a project, after creating the project you will get the INFURA_SECRET_KEY and INFURA_ID set them here.
// const INFURA_ID="2LSfl8m1AegQXMnDUtWSNFMAao4";
// const INFURA_SECRET_KEY="2b887b13da9df9208a92e1fcb7d3e742"
// const auth = 'Basic ' + Buffer.from(INFURA_ID + ':' + INFURA_SECRET_KEY).toString('base64');
async function ipfsClient() {
    const ipfs1 = await create(
        {
            host: "ipfs.infura.io",
            port: 5001,
            protocol: "https",
        //       headers: {
        //        authorization: auth, // infura auth credentails
        //    },
        }
    );
    return ipfs1;
}


// async function saveText() {
//     let ipfs = await ipfsClient();

//     let result = await ipfs.add(`welcome ${new Date()}`);
//     console.log(result);
// }
// // saveText();

// async function saveFile() {

//     let ipfs = await ipfsClient();

//     let data = fs.readFileSync("./package.json")
//     let options = {
//         warpWithDirectory: false,
//         progress: (prog) => console.log(`Saved :${prog}`)
//     }
//     let result = await ipfs.add(data, options);
//     console.log(result)
// }
// saveFile()

async function getData() {
    let ipfs = await ipfsClient();

    let asyncitr = ipfs.cat("QmTd7yVxHdShGiW9UDcn1HjPjSurg6br1s2kEdKyzFDNxV");

    for await (const itr of asyncitr) {

        let data = Buffer.from(itr).toString()
        console.log(data);
    }
}
getData();
