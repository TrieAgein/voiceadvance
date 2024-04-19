import React, { useState } from 'react';
import Image from 'next/image';
import close from '../public/close.svg';
import DeptDropdown from './deptDropdown';
import PriorityDropdown from './priorityDropdown';
import CategoryDropdown from './categoryDropdown';
import '../css/page.css';

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Show the "New Comment" button only when the popup is closed */}
      {!isOpen && (
        <a className="button" onClick={togglePopup}>New Comment <span style={{ fontSize: '150%' }}>+</span></a>
      )}
      {/* Show the popup when isOpen is true */}
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
              <h1>New Comment</h1>
              <h2 className='asterisk'>Comment Title</h2>
              <input style={{ width: '100%', padding: '5px', border: 'solid black'}} type="text" placeholder="Enter Title here..." />
              <div className='category-container'>
                <div className='item'>
                  <h3 className='asterisk'>Select your Department</h3>
                  <DeptDropdown/>
                </div>
                <div className='item'>
                  <h3 className='asterisk'>Select Priority Level</h3>
                  <PriorityDropdown/>
                </div>
                <div className='item'>
                  <h3 className='asterisk'>Category</h3>
                  <CategoryDropdown/>
                </div>
              </div><br/>
              <textarea
                style={{ width: '100%', height: '200px', padding: '5px', resize: 'none', border: 'solid black'}}
                placeholder="Your comment here..."
              ></textarea>
              < div className="close-button" onClick={togglePopup}>
                  <a className='submit-comment'>Submit</a>
              </div>
              <div className='close-button' onClick={togglePopup}>
                <a className='save-comment'>Save Comment</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Popup;