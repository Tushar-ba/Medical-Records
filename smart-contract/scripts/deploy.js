const hre = require("hardhat");


async function main() {
    const deployer = await ethers.getSigners();
    console.log("Deploying contract with the account:", deployer.address);

    const ContractFactory = await ethers.getContractFactory("MedicalContract");
    const contract = await ContractFactory.deploy();
    await contract.waitForDeployment();

    console.log('Address of this contract:', await contract.getAddress());
}


main()
.then(()=>process.exit(0))
.catch((error)=>{
    console.error(error);
    process.exit(1);
})

//0x6060e0e53a18EB3E86d9697c81131146Eb6e0Ef9

//0xC547E005dE96b55f7C0E6BF69f4953Db95b902B3