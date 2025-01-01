import React, { useState, useEffect } from 'react';
import { connectWallet, uploadToPinata } from '../utils/contractUtils';
import { toast } from 'react-toastify';

const MedicalRecordForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phNumber: '',
    gender: '',
    bloodType: '',
    previousHistory: '',
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setIsConnected(accounts.length > 0);
      }
    };

    checkConnection();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'phNumber') {
      setIsPhoneValid(value.length === 10 && /^\d+$/.test(value));
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isConnected) {
      toast.error('Please connect to MetaMask first');
      return;
    }
    if (!isPhoneValid) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    setLoading(true);

    try {
      const { contract } = await connectWallet();
      
      // Upload file to Pinata
      const ipfsHash = await uploadToPinata(file);
      
      // Create record
      const tx = await contract.createRecord(
        formData.name,
        ipfsHash,
        formData.phNumber,
        formData.gender,
        formData.bloodType,
        formData.previousHistory
      );

      await tx.wait();
      toast.success('Medical record created successfully!');
      setFormData({
        name: '',
        phNumber: '',
        gender: '',
        bloodType: '',
        previousHistory: '',
      });
      setFile(null);
      setIsPhoneValid(false);
    } catch (error) {
      console.error('Error creating medical record:', error);
      toast.error('Failed to create medical record');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Medical Record</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#BEADFA] focus:ring focus:ring-[#BEADFA] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label htmlFor="phNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="phNumber"
              name="phNumber"
              value={formData.phNumber}
              onChange={handleInputChange}
              required
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring ${
                formData.phNumber.length > 0
                  ? isPhoneValid
                    ? 'border-green-500 focus:border-green-500 focus:ring-green-500'
                    : 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-[#BEADFA] focus:ring-[#BEADFA]'
              }`}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#BEADFA] focus:ring focus:ring-[#BEADFA] focus:ring-opacity-50"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="bloodType" className="block text-sm font-medium text-gray-700">Blood Type</label>
            <input
              type="text"
              id="bloodType"
              name="bloodType"
              value={formData.bloodType}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#BEADFA] focus:ring focus:ring-[#BEADFA] focus:ring-opacity-50"
            />
          </div>
        </div>
        <div>
          <label htmlFor="previousHistory" className="block text-sm font-medium text-gray-700">Previous History</label>
          <textarea
            id="previousHistory"
            name="previousHistory"
            value={formData.previousHistory}
            onChange={handleInputChange}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#BEADFA] focus:ring focus:ring-[#BEADFA] focus:ring-opacity-50"
          ></textarea>
        </div>
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">Upload File</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            required
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-[#BEADFA] file:text-white
              hover:file:bg-opacity-90"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !isConnected || !isPhoneValid}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#BEADFA] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BEADFA] disabled:opacity-50 transition-colors duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-3 inline-block" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : 'Create Record'}
        </button>
      </form>
    </div>
  );
};

export default MedicalRecordForm;

