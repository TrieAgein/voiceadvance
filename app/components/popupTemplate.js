import React, { useState } from 'react';
import Image from 'next/image';
import close from '../public/close.svg';
import '../css/page.css';

const PopupTemplate = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <>
      {/* Placeholder button */}
      <a className="button" onClick={togglePopup}>Open Popup</a>
      {isOpen && (
        <div id='popup-wrapper'>
          <div className='popup'>
            {/* Placeholder content */}
            <div className="close-button" onClick={togglePopup}>
              <Image 
              src={close} 
              alt="close"
              />
            </div>
            <div id="popup-body">
              <h1>Placeholder Title</h1>
              <input style={{ width: '100%', padding: '5px' }} type="text" placeholder="Placeholder Input" />
              <h2>Placeholder Section</h2>
              <textarea
                style={{ width: '100%', height: '200px', padding: '5px', resize: 'none' }}
                placeholder="Placeholder Textarea"
              ></textarea>  
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PopupTemplate;
