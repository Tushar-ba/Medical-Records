import React, { useState } from 'react';
import { ethers } from 'ethers';
import NavBar from '../components/NavBar'

const contractAddress = '0x85c92b6405c0d0d120a4bdd1de40bb7bfbb554c9'; 
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "patient",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "phoneNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "allergies",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "bloodGroup",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "previousHistory",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "gender",
				"type": "string"
			}
		],
		"name": "addRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "patient",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "phoneNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "allergies",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "bloodGroup",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "previousHistory",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "gender",
				"type": "string"
			}
		],
		"name": "updateRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "patient",
				"type": "address"
			}
		],
		"name": "getRecord",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "phoneNumber",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "allergies",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "bloodGroup",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "previousHistory",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "gender",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]


const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const address = await signer.getAddress();
console.log(address)

const contract = new ethers.Contract(contractAddress, contractABI, signer);

function MedicalRecords() {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [allergies, setAllergies] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [previousHistory, setPreviousHistory] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [patientRecord, setPatientRecord] = useState('');

    async function addRecord() {
        await contract.addRecord(
            address,
            name,
            phoneNumber,
            email,
            allergies,
            bloodGroup,
            previousHistory,
            gender
        );
    }

    async function updateRecord() {
        await contract.updateRecord(
            address,
            name,
            phoneNumber,
            email,
            allergies,
            bloodGroup,
            previousHistory,
            gender
        );
    }

    async function getRecord() {
        const result = await contract.getRecord(address);
        setPatientRecord(result);
    }

    return (
		<>
		<NavBar/>
		<div className='m-5'>
			<div className='flex flex-col gap-3 mt-5  '>
            <h2 className='text-center text-3xl font-bold'> Medical Records</h2>
				<p className='text-xl'>Enter Patient Details</p>
                <input type="text" value={address} placeholder='Patient Address' onChange={(e) => setAddress(e.target.value)} className='p-2 rounded-md shadow-md' />
           
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
				placeholder='Name'
				className='p-2 rounded-md shadow-md' />

                <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}placeholder='Phone Number' 
				className='p-2 rounded-md shadow-md'/>
        
           
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}placeholder='E-mail'
				className='p-2 rounded-md shadow-md ' />
        
           
                <input type="text" value={allergies} onChange={(e) => setAllergies(e.target.value)} placeholder='Allergies' 
				className='p-2 rounded-md shadow-md'/>
        
           
                <input type="text" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} placeholder='Blood Group'
				className='p-2 rounded-md shadow-md' />
        
           
                <input type="text" value={previousHistory} onChange={(e) => setPreviousHistory(e.target.value)}placeholder='Previous History' 
				className='p-2 rounded-md shadow-md'/>
        
           
                <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} placeholder='Gender'
				className='p-2 rounded-md shadow-md'/>
        
			<div className='flex justify-around mt-5'>
				<button onClick={addRecord} className='bg-[#BEADFA] w-[150px] p-2 rounded-md font-semibold hover:bg-[#DFCCFB] shadow-md'>Add Record</button>
            	<button onClick={updateRecord} className='bg-[#BEADFA] w-[150px] p-2 rounded-md font-semibold hover:bg-[#DFCCFB] shadow-md'>Update Record</button>
            	<button onClick={getRecord} className='bg-[#BEADFA] w-[150px] p-2 rounded-md font-semibold hover:bg-[#DFCCFB] shadow-md'>Get Record</button>
			</div>
            
            <div className='mt-5'>
                <h3 className='text-xl font-semibold text-center mb-1'>Patient Record</h3>
				<div className='flex gap-3 flex-col bg-white p-3 rounded-xl shadow-md'>
				<p>Name: {patientRecord.name}</p>
                <p>Phone Number: {patientRecord.phoneNumber}</p>
                <p>Email: {patientRecord.email}</p>
                <p>Allergies: {patientRecord.allergies}</p>
                <p>Blood Group: {patientRecord.bloodGroup}</p>
                <p>Previous History: {patientRecord.previousHistory}</p>
                <p>Gender: {patientRecord.gender}</p>
                <p>Timestamp: {patientRecord.timestamp}</p>
				</div>
            </div>
        </div>
		</div>
		</>
        
    );
}

export default MedicalRecords;
