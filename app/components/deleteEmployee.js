import React, { useState } from 'react';
import Image from 'next/image';
import close from '/images/icons/close.svg';
import '../css/page.css';
import EmployeeListDelete from './employeeListDelete.js';

const All = () => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
      setIsOpen(!isOpen);
    };

    return (
        <>
        <a className="dropdown_a" onClick={togglePopup}>Delete An Employee</a>
        {isOpen && (
            <div id='popup-wrapper'>
              <div className='popup'>
                <div className="close-button" onClick={togglePopup}>
                  <Image 
                  src={close} 
                  alt="close"
                  width={24} // Add appropriate size
                  height={24} // Add appropriate size
                  />
                </div>
                <div id="popup-body">
                   <h1>View All Employees</h1>
                   <div id="claim-list" className="claim-list line">
                       <EmployeeListDelete onEmployeeDelete={togglePopup}/>
                   </div>
                </div>
              </div>
            </div>
        )}
        </>
    );
};

export default All;