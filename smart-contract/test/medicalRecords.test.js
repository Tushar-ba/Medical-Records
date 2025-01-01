const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");


describe("Medical records",function(){
  let owner,recoder,patient1,patient2
  let medicalRecord
  beforeEach(async function(){
    [owner,recoder,patient1,patient2] = await ethers.getSigners();
    const MedicaRecords = await ethers.getContractFactory("MedicalContract",owner);
    medicalRecord = await MedicaRecords.deploy();
    await medicalRecord.waitForDeployment();
    await medicalRecord.connect(owner).initialize(owner.address);
    await medicalRecord.connect(owner).grantAccess(owner.address)
    console.log(await medicalRecord.getAddress()); 
  })
  it("Should create a record",async function(){
    expect(await medicalRecord.connect(owner).createRecord("this","dasdkas",9999999,"M","ds","dasdasd")).to.emit(medicalRecord,"RecordCreated").withArgs(0,owner.address);
    const info = await medicalRecord.connect(owner).viewTheRecord(1);
    console.log(info)
  })
})
