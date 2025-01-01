import  { useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import { toast, ToastContainer, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {contractABI} from "../utils/Recordkeeper.js";

const contractAddress = "0x6060e0e53a18EB3E86d9697c81131146Eb6e0Ef9";
const pinataApiKey = import.meta.env.VITE_PINATA_API_KEY;
const pinataSecretApiKey = import.meta.env.VITE_PINATA_SECRET_KEY;

console.log("Pinata API Key:", pinataApiKey);
console.log("Pinata Secret API Key:", pinataSecretApiKey);

const MedicalRecords = () => {
  const [form, setForm] = useState({
    name: "",
    file: null,
    ipfsHash: "",
    phoneNumber: "",
    age: "",
    sex: "",
    previousHistory: "",
    bloodType: "",
  });
  console.log(form)

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [retrievedRecord, setRetrievedRecord] = useState(null);
  const [metamaskAddress, setMetamaskAddress] = useState("");
  const [connected, setConnected] = useState(false);
  const [phoneNumberValid, setPhoneNumberValid] = useState(false);


  const connectToMetaMask = async () => {
    if (window.ethereum) {
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      await web3Provider.send("eth_requestAccounts", []);
      const web3Signer = await web3Provider.getSigner();
      const web3Contract = new ethers.Contract(contractAddress, contractABI , web3Signer);
      const address = await web3Signer.getAddress();
      setProvider(web3Provider);
      setSigner(web3Signer);
      setContract(web3Contract);
      setMetamaskAddress(address);
      setConnected(true);
    } else {
      console.error("MetaMask not found");
    }
  };

  const handleChange = (e) => {
	const { name, value, files } = e.target;
	if (name === "phoneNumber") {
	  const isValidPhoneNumber = /^\d{10}$/.test(value);
	  setPhoneNumberValid(isValidPhoneNumber);
	}
	if (files) {
	  setForm({ ...form, file: files[0] });
	} else {
	  setForm({ ...form, [name]: value });
	}
  };
  

  const handleUpload = async () => {
    if (form.file) {
      const formData = new FormData();
      formData.append("file", form.file);

      const metadata = JSON.stringify({
        name: form.file.name,
        keyvalues: {
          name: form.name,
        },
      });
      formData.append("pinataMetadata", metadata);

      try {
        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
          maxBodyLength: "Infinity",
          headers: {
            "Content-Type": "multipart/form-data",
            pinata_api_key: pinataApiKey,
            pinata_secret_api_key: pinataSecretApiKey,
          },
        });
        const ipfsHash = res.data.IpfsHash;
        setForm({ ...form, ipfsHash });
        toast.info('File uploaded', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      } catch (error) {
        console.error("Error uploading file to Pinata:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (contract) {
      try {
        const tx = await contract.createRecord(
          form.name,
          form.ipfsHash,
          form.sex,
          form.age,
          form.phoneNumber,
          form.previousHistory,
        );
        await tx.wait();
        toast.success("Record created successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      } catch (error) {
        console.error("Error creating record:", error);
      }
    }
  };

  const handleGetRecord = async (e) => {
    e.preventDefault();
    if (contract) {
      try {
        const record = await contract.getRecord(form.patientAddress);
  
        // Log the value and type of age for debugging
        console.log("record.age:", record.age);
        console.log("Type of record.age:", typeof record.age);
  
        let ageValue;
        if (typeof record.age === 'object' && record.age._isBigNumber) {
          // Handle BigNumber type
          ageValue = record.age.toNumber();
        } else {
          // Handle string or number types
          ageValue = parseInt(record.age, 10);
        }
  
        setRetrievedRecord({
          name: record.name,
          sex: record.sex,
          age: ageValue, // Ensure age is set correctly based on its type
          phoneNumber: record.phoneNumber,
          previousHistory: record.previousHistory,
          email: record.email,
          ipfsHash: record.ipfsHash
        });
  
        toast.success("Record retrieved successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      } catch (error) {
        console.error("Error retrieving record:", error);
        toast.error("Error retrieving record", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    }
  };
  
  

  
  const handleDeleteRecord = async (e) => {
    e.preventDefault();
    if (contract) {
      try {
        const tx = await contract.deleteRecord(form.patientAddress);
        await tx.wait();
        toast.success("Record deleted successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        setRetrievedRecord(null);
      } catch (error) {
        console.error("Error deleting record:", error);
      }
    }
  };
  
  


  return (
    <div>
      <button
        onClick={connectToMetaMask}
        className="bg-[#BEADFA] p-2 rounded-xl font-semibold text-xl w-[200px] font-sans truncate hover:bg-[#DFCCFB] m-[20px]"
      >
        {connected ? metamaskAddress : "Connect to MetaMask"}
      </button>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 m-[20px]">
          <input
            type="text"
            name="patientAddress"
            placeholder="Patient Address"
            value={form.patientAddress}
            onChange={handleChange}
            required
            className="h-[40px] rounded-lg p-3"
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="h-[40px] rounded-lg p-3"
          />
          <input
            type="text"
            name="sex"
            placeholder="Sex"
            value={form.sex}
            onChange={handleChange}
            required
            className="h-[40px] rounded-lg p-3"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            required
            className="h-[40px] rounded-lg p-3"
          />
          <input
			type="text"
			name="phoneNumber"
			placeholder="Phone Number"
			value={form.phoneNumber}
			onChange={handleChange}
			required
			className={`h-[40px] rounded-lg p-3 ${phoneNumberValid ? 'border-green-500' : 'border-red-500'}`}
			/>
          <input
            type="text"
            name="previousHistory"
            placeholder="Previous History"
            value={form.previousHistory}
            onChange={handleChange}
            required
            className="h-[40px] rounded-lg p-3"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="h-[40px] rounded-lg p-3"
          />
          <input type="file" onChange={handleChange} required />
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleUpload}
              className="bg-[#BEADFA] p-2 rounded-xl font-semibold text-xl w-[200px] font-sans truncate hover:bg-[#DFCCFB]"
            >
              Upload to Pinata
            </button>
            <button
              type="submit"
              className="bg-[#BEADFA] p-2 rounded-xl font-semibold text-xl w-[200px] font-sans truncate hover:bg-[#DFCCFB]"
            >
              Create Record
            </button>
          </div>
        </form>
      </div>
      <form onSubmit={handleGetRecord}>
        <input
          type="text"
          name="patientAddress"
          placeholder="Patient Address"
          value={form.patientAddress}
          onChange={handleChange}
          required
          className="h-[40px] rounded-lg p-3 ml-[20px]"
        />
        <button
          type="submit"
          className="bg-[#BEADFA] p-2 rounded-xl font-semibold text-xl w-[200px] font-sans truncate hover:bg-[#DFCCFB] m-[20px]"
        >
          Get Record
        </button>
		

      </form>
      {retrievedRecord && (
        <div className="bg-white m-auto w-[600px] flex flex-col gap-2 p-[20px] rounded-xl">
            <h3 className="text-2xl font-bold text-center">Retrieved Record</h3>
            <p><b>Name:</b>   {retrievedRecord.name}</p>
            <p><b>Sex:</b> {retrievedRecord.sex}</p>
            <p><b>Age:</b> {retrievedRecord.age}</p>
            <p><b>Phone Number:</b> {retrievedRecord.phoneNumber}</p>
            <p><b>Previous History:</b> {retrievedRecord.previousHistory}</p>
            <p><b>Email:</b> {retrievedRecord.email}</p>
            <p>
            <b>IPFS Hash:</b>{" "}
            <a
              href={`https://olive-legislative-meerkat-242.mypinata.cloud/ipfs/${retrievedRecord.ipfsHash}`}
              target="_blank"
              rel="noopener noreferrer"
             className="bg-[#BEADFA] p-1 rounded-xl font-semibold  font-sans  hover:bg-[#DFCCFB] ">
              View file
            </a>
          </p>
        </div>
      )}
      <div>
		<button
            onClick={handleDeleteRecord}
            className="bg-[#BEADFA] p-2 rounded-xl font-semibold text-xl w-[200px] font-sans truncate hover:bg-[#DFCCFB] m-[20px]"
          >
            Delete Record
          </button>
</div>
      <ToastContainer />
    </div>
  );
};

export default MedicalRecords;
