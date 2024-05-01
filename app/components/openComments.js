import React, { useState } from 'react';
import Image from 'next/image';
import close from '/images/icons/close.svg';
import '../css/page.css';
import CommentsList from './commentsList.client.js';

const Active = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <a onClick={togglePopup}>Open</a>
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
              <h1>Open Comments</h1>
			  <CommentsList filter={false}/>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Active;
