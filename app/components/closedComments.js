import React, { useState } from 'react';
import Image from 'next/image';
import close from '/images/icons/close.svg';
import '../css/page.css';
const All = () => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
      setIsOpen(!isOpen);
    };
  return (
    <>
    <a onClick={togglePopup}>Closed</a>
    {isOpen && (
        <div id='popup-wrapper'>
          <div className='popup'>
            <div className="close-button" onClick={togglePopup}>
              <Image 
              src={close} 
              alt="close"
              />
            </div>
            <div id="popup-body">
               <h1>Closed Comments</h1>
            </div>
          </div>
        </div>
    )}
    </>
  );
};

export default All;
