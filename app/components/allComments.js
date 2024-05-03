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
    <a class="dropdown_a" onClick={togglePopup}>All</a>
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
               <h1>All Comments</h1>
               <div id="claim-list" className="claim-list line">
               <CommentsList/>
               </div>
            </div>
          </div>
        </div>
    )}
    </>
  );
};

export default All;
