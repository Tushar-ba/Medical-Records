import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import MedicalRecordForm from './components/MedicalRecordForm';
import UpdateMedicalRecordForm from './components/UpdateMedicalRecordForm';
import ViewMedicalRecord from './components/ViewMedicalRecord';

function App() {
  const [activeForm, setActiveForm] = useState('create');

  return (
<div className="min-h-screen bg-[#FFF3DA] flex flex-col relative overflow-hidden">
  <div className="absolute inset-0 z-0">
    <div className="absolute top-0 left-0 w-72 h-72 md:w-96 md:h-96 bg-[#BEADFA] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
    <div className="absolute top-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-[#D0BFFF] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
    <div className="absolute bottom-0 left-1/2 w-72 h-72 md:w-96 md:h-96 bg-[#BEADFA] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
  </div>

  <Navbar />

  <div className="flex-grow py-6 flex flex-col justify-center sm:py-12 relative z-10">
    <div className="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto w-full px-4 sm:px-0">
      <div className="absolute inset-0 bg-gradient-to-r from-[#BEADFA] to-[#D0BFFF] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div className="max-w-full mx-auto">
          <div className="divide-y divide-gray-200">
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <h2 className="text-3xl font-extrabold text-center text-gray-900">Medical Records</h2>
              <p className="text-center text-gray-600">Securely store and manage patient information</p>
            </div>
            <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <button
                  onClick={() => setActiveForm('create')}
                  className={`px-4 py-2 rounded-md transition-all duration-200 ${
                    activeForm === 'create'
                      ? 'bg-[#BEADFA] text-white shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Create Record
                </button>
                <button
                  onClick={() => setActiveForm('update')}
                  className={`px-4 py-2 rounded-md transition-all duration-200 ${
                    activeForm === 'update'
                      ? 'bg-[#BEADFA] text-white shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Update Record
                </button>
                <button
                  onClick={() => setActiveForm('view')}
                  className={`px-4 py-2 rounded-md transition-all duration-200 ${
                    activeForm === 'view'
                      ? 'bg-[#BEADFA] text-white shadow-md'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  View Record
                </button>
              </div>
              <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
                {activeForm === 'create' && <MedicalRecordForm />}
                {activeForm === 'update' && <UpdateMedicalRecordForm />}
                {activeForm === 'view' && <ViewMedicalRecord />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <footer className="bg-[#BEADFA] text-white py-4 relative z-10">
    <div className="container mx-auto text-center">
      <p>&copy; 2023 Medical Records App. All rights reserved.</p>
    </div>
  </footer>

  <ToastContainer
    position="bottom-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
  />
</div>
  );
}

export default App;

