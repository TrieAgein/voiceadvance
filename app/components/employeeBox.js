import React, { useState, useEffect} from 'react';
import '../css/commentBox.css'; 
import Image from 'next/image';
import close from '/images/icons/close.svg';

const EmployeeBox = ({
  name,
  role
}) => {
    return (<div className="claim-wrapper">
    <div className="title">{name}</div>
     <hr/>
     <div className="description">{role}</div>
   </div>)
 
};

export default EmployeeBox;