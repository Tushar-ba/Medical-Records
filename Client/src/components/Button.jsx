import React, { useState } from 'react';
import { ethers } from 'ethers';



const Button = () => {
    const [connect, setConnect] = useState("Connect");

    const connectToMetaMask = async () => {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            console.log(address);
            setConnect(address);
        } else {
            console.log("Install MetaMask");
        }
    };

    return (
        <button onClick={connectToMetaMask} className='bg-[#BEADFA] p-2 rounded-2xl  font-semibold text-2xl w-[200px] font-sans truncate hover:bg-[#DFCCFB]'>{`${connect}`}</button>
    );
};

export default Button;
