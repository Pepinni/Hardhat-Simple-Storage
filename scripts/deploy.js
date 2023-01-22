// imports
const {ethers, run, network} = require("hardhat");
// const fs = require("fs-extra");
require("dotenv").config();

// async main
async function main(){
    const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
    console.log("Deploying Contract");
    const simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.deployed();
    console.log(`Deployed contract to : ${simpleStorage.address}`);
    // console.log(network.config);
    if(network.config.chainId === 4 && process.env.etherscanAPI){
        await simpleStorage.deployTransaction.wait(6);
        await verify(simpleStorage.address,[]);
    }

    const currentValue = await simpleStorage.retrieve();
    console.log(`Current value is ${currentValue}`);
    const transactionResponse = await simpleStorage.store(7);
    await transactionResponse.wait(1);
    const updatedValue = await simpleStorage.retrieve();
    console.log(`Updated value is ${updatedValue}`);
}

async function verify(contractAddress, arg){
    console.log("Verifying contract...");
    try{
        await run("verify:verify",{
            address: contractAddress,
            constructorArguments: args,
        });

    }catch(e){
        if(e.message.toLowerCase().includes("already verified")){
            console.log("Already Verified");
        }
        else{
            console.log(e);
        }
    }
}
// async function main(){
//     let provider = new ethers.providers.JsonRpcProvider(process.env.RPCURL);
//     let wallet = new ethers.Wallet(
//         process.env.privateKey,
//         provider
//     );
//     // https://eth-goerli.g.alchemy.com/v2/RPoi2X0aCQa53-3j8etQshMZmhT7QD9M
//     // RPCURL=HTTP://192.168.1.9:8545
//     // d7f0844141d90bebc6eb3a9b1cccdf190aeb128671298fa54fc9711ef34781ba
//     // let encryptedJson = fs.readFileSync("./.encryptKey.json", "utf8");
//     // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
//     //     encryptedJson,
//     //     process.env.pwd
//     // );
//     wallet = await wallet.connect(provider);
//     const abi = fs.readFileSync(",/SimpleStorage_sol_SimpleStorage.abi","utf8");
//     const binary = fs.readFileSync(",/SimpleStorage_sol_SimpleStorage.bin","utf8");

//     const contractFactory = new ethers.ContractFactory(abi,binary,wallet);
//     console.log("Deploying, please wait...");
//     const contract = await contractFactory.deploy(); // Stop here nad wait for the contract to reply.
//     await contract.deployTransaction.wait(1);
//     //get number
//     const currentFavoriteNumber = await contract.retrieve();
//     console.log(`Current favorite number is ${currentFavoriteNumber.toString()}`);
//     const transactionResponse = await contract.store("7");
//     const transactionReceipt = await transactionResponse.wait(1);
//     const updatedFavoriteNumber = await contract.retrieve();
//     console.log(`New favorite number is ${updatedFavoriteNumber.toString()}`);
// }

main()
 
.then(()=> process.exit(0))
.catch((error) => {
    console.log(error);
    process.exit(1);
});

