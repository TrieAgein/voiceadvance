import React, { useState } from 'react';
import Image from 'next/image';
import close from '/images/icons/close.svg';
import '../css/page.css';
import CommentsList from './commentsList.client.js';

const All = () => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
      setIsOpen(!isOpen);
    };

  return (
    <>
    <a onClick={togglePopup}>Update Employee</a>
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
               <h1>Update Employee</h1>
            </div>
          </div>
        </div>
    )}
    </>
  );
};

export default All;
