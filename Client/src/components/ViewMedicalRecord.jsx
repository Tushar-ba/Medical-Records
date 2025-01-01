import React, { useState } from 'react';
import { connectWallet } from '../utils/contractUtils';
import { toast } from 'react-toastify';

const ViewMedicalRecord = () => {
  const [recordId, setRecordId] = useState('');
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setRecordId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { contract } = await connectWallet();
      const result = await contract.viewTheRecord(recordId);
      
      setRecord({
        name: result[0],
        fileHash: result[1],
        phNumber: result[2],
        gender: result[3],
        bloodType: result[4],
        previousHistory: result[5],
        //timestamp: new Date(result[6].toNumber() * 1000).toLocaleString(),
      });

      console.log(setRecord);


      toast.success('Record retrieved successfully');
    } catch (error) {
      console.error('Error retrieving medical record:', error);
      toast.error('Failed to retrieve medical record');
      setRecord(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">View Medical Record</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="recordId" className="block text-sm font-medium text-gray-700">Record ID</label>
          <input
            type="text"
            id="recordId"
            value={recordId}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#BEADFA] focus:ring focus:ring-[#BEADFA] focus:ring-opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#BEADFA] hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BEADFA] disabled:opacity-50 transition-colors duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 mr-3 inline-block" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : 'View Record'}
        </button>
      </form>

      {record && (
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Medical Record Details</h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Full name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{record.name}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{record.phNumber}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Gender</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{record.gender}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Blood type</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{record.bloodType}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Previous history</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{record.previousHistory}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">File hash</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{record.fileHash}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Last updated</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{record.timestamp}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewMedicalRecord;

