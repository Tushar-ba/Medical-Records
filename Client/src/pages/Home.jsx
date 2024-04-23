import React from "react";
import NavBar from "../components/NavBar";
import ethereumLogo from "../../Public/ethereumLogo.png";
import hero from "../../Public/hero.svg";

const Home = () => {
  return (
    <>
      <NavBar />
      {/* hero section */}
      <div className="m-2 pt-[30px]  flex flex-row-reverse  justify-center items-center md:justify-around  ">
        <div>
          <img src={hero} alt="" className="max-w-[300px] md:max-w-[480px]" />
        </div>
        <div className="">
          <h1 className="text-[25px] font-bold  md:text-4xl">
            <u>
              Trust in Us <br /> Trust in Decentralization
            </u>
          </h1>
          <p className="pt-[25px] font-semibold text-[15px] md:text-xl">
            New Way to Keep Your Medical Records <br /> Updated and stay In
            charge
          </p>
          <div className="flex gap-4 m-4 md:m-0 md:pl z-10 md:mt-20 ">
        <img
          src={ethereumLogo}
          alt="Ethereum"
          className="max-w-[80px] md:max-w-[100px] h-auto"
        />
        <p className="flex self-center ">Now Available on Ethereum</p>
      </div>
        </div>
      </div>
      
    </>
  );
};

export default Home;
