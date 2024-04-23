const hre = require("hardhat");


async function main() {
    const deployer = await ethers.getSigner();
    console.log("Deploying contract with the account:", deployer.address);

    const ContractFactory = await ethers.getContractFactory("MedicalRecordStorage");
    const contract = await ContractFactory.deploy();
    await contract.deployed();

    const address = contract.address;
    console.log('Address of this contract:', address);
}


main()
.then(()=>process.exit(0))
.catch((error)=>{
    console.error(error);
    process.exit(1);
})


// 0x4Ec6Aa4118410C092F26154e8a22cc3cCc91c535