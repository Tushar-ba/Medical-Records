import React, { useState } from "react";
import { Link } from 'react-router-dom';
import logo from "../../Public/logo.png";
import Button from "./Button"
import { IoMdClose} from "react-icons/io";
import { BiMenuAltRight } from "react-icons/bi";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>   
      <div>
        <div>
          <div className= "hidden md:flex  md:justify-around h-[50px] m-4">
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
            <Button />
          </div>
          <div className="flex m-4 justify-between xl:hidden md:hidden">
          <img src={logo} alt="logo" className="max-w-[50px]"/>
          <div>
            <button className="text-4xl text-right" onClick={toggleMenu}>
            <BiMenuAltRight />
            </button>
          </div>
          </div>
          {menuOpen && (
            <div className="md:hidden fixed inset-0 bg-white  z-50 xl:hidden">
              <div className="flex justify-end p-4">
                <button className="text-4xl" onClick={toggleMenu}>
                <IoMdClose />
                </button>
              </div>
              <ul className="flex flex-col items-center">
                <li className="my-4">
                  <Link to="/">Home</Link>
                </li>
                <li className="my-4">
                  <Link to="/Services">Services</Link>
                </li>
                <li className="my-4">
                  <Link to="/About" >About</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
