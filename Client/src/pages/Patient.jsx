import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import logo from "../../Public/logo.png"
import { contractABI } from '../utils/patient';
import {Link} from 'react-router-dom'


const contractAddress = '0x4Ec6Aa4118410C092F26154e8a22cc3cCc91c535';


const Patient = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [bloodtype, setBloodtype] = useState("");
  const [previousHistory, setPreviousHistory] = useState("");
  const [record, setRecord] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  // const [isLoading, setIsLoading] = useState('false');

  const ConnectToWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setIsConnected(true);
        console.log("Wallet Connected");
      } else {
        console.log("wallet not found");
      }
    } catch (error) {
      console.log("Install any web3 wallets", error);
    }
  };

  const createRecord = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      // setIsLoading(false)
      await contract.createRecord(
        name,
        number,
        email,
        bloodtype,
        previousHistory,
      );
      // setIsLoading(false)
      // const transationhash = await contract.addToBlockchain();
      // setIsLoading(true);
      //  await transationhash.wait();
      //  setIsLoading(false);
      console.log("Record Created");
      alert("Record Created");
    } catch (error) {
      console.log("Error creating Record", error);
    }
  };

  const updateRecord = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      await contract.updateRecord(
        name,
        number,
        email,
        bloodtype,
        previousHistory
      );
      console.log("Record Created");
      alert("Record Created");
    } catch (error) {
      console.log("Error creating Record", error);
    }
  };

  useEffect (()=>{
    const getRecord = async ()=>{
      try{
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )
        const fetchRecords = await contract.records(window.ethereum.selectedAddress)
        setRecord(fetchRecords);
        console.log("Records Fetched successfully")
      }catch(error){
        console.log("Error fetching the records",error)
      }
    };

    if(isConnected){
      getRecord();
    }
  },[isConnected])
 

  return(
    //Header
    <div className="m-5">
      <div className="hidden md:flex xl:flex  md:justify-between h-[50px] ">
        <img src={logo} alt="logo" />
            <ul className="font-test flex gap-20 justify-center items-center">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                <Link to="/Services">Services</Link>
                </li>
                <li>
                <Link to="/About">About</Link>
                </li>
            </ul>
            <button onClick={ConnectToWallet} className='bg-[#BEADFA] p-2 rounded-2xl  font-semibold text-2xl w-[200px] font-sans truncate hover:bg-[#DFCCFB]'>connect</button>
        </div>

        <div>
          {isConnected && (
            <>
            <div>
              <div className="flex flex-col gap-1 mt-5">
                <input type="text"
                 placeholder="Name"
                 value={name}
                 onChange={(e)=>setName(e.target.value)} 
                  className="p-2 rounded-md"/>

                 <input type="number"
                 placeholder="PhoneNumber"
                 value={number}
                 onChange={(e)=>setNumber(e.target.value)}
                 className="p-2 rounded-md"
                  />


                  <input type="text"
                 placeholder="E-mail"
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                 className="p-2 rounded-md"
                  />


                  <input type="text" pattern="[0-9a-zA-Z!@#$%^&*()_+-=,./<>?;:'\]"
                 placeholder="Blood Group"
                 value={bloodtype}
                 onChange={(e)=>setBloodtype(e.target.value)}
                 className="p-2 rounded-md"
                  />


                  <input type="text"
                 placeholder="Previous History"
                 value={previousHistory}
                 onChange={(e)=>setPreviousHistory(e.target.value)}
                 className="p-2 rounded-md"
                  />
              </div >
              <div className="flex mt-6 justify-between">
                  <button onClick={createRecord} className="bg-[#BEADFA] w-[150px] p-2 rounded-md font-semibold hover:bg-[#DFCCFB] ">Create Record</button>
                  <button onClick={updateRecord} className="bg-[#BEADFA] w-[150px] p-2 rounded-md font-semibold hover:bg-[#DFCCFB]">Update Record</button>
              </div>
                <div className="mt-8">
                  {record && (
                    <>
                      <div className="flex flex-col gap-6">
                        <h2 className="text-4xl font-bold"><u>Record Details</u></h2>
                        <p>Name: {record.name}</p>
                        <p>Phone Number: {record.phoneNumber}</p>
                        <p>E-mail: {record.email}</p>
                        <p>Blood Group: {record.bloodGroup}</p>
                        <p>Previous History: {record.previousHistory}</p>
                      </div>
                    </>
                  )}
                </div>

            </div>
            </>
          )}
        </div>
    </div>
  )
};

export default Patient;
