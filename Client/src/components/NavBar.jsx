import React, { useState, useEffect } from 'react';
import { connectWallet } from '../utils/contractUtils';

const Navbar = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState('');

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setIsConnected(true);
          setUserAddress(accounts[0]);
        }
      }
    };

    checkConnection();
  }, []);

  const handleConnect = async () => {
    try {
      const { signer } = await connectWallet();
      const address = await signer.getAddress();
      setIsConnected(true);
      setUserAddress(address);
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <svg className="h-8 w-8 text-[#BEADFA]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="ml-3 text-xl font-bold text-gray-800">Medical Records App</span>
        </div>
        <div>
          {isConnected ? (
            <div className="bg-[#BEADFA] text-white px-4 py-2 rounded-full font-medium">
              Connected: {userAddress.slice(0, 6)}...{userAddress.slice(-4)}
            </div>
          ) : (
            <button
              onClick={handleConnect}
              className="bg-[#BEADFA] text-white px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition-colors flex items-center"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Connect to MetaMask
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

