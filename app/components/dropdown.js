import React, { useState } from 'react';
import Image from 'next/image';
import arrowsSVG from '../public/arrows.svg';
import '../css/page.css';

const Dropdown = () => {
  const [toggled, setToggled] = useState(false);

  return (
    <div className={"dropdown"+(toggled ? ' open' : '')}>
      <a onClick={()=>{setToggled(!toggled)}} className="title">Comments
        <Image
              src={arrowsSVG}
              height="0"
              width="20"
              float="right"
              vertical-align="middle"
              rotate="180deg"
              alt='arrow'
        /> 
      </a>
      <div className="content">
          <a>All</a>
          <a>Active</a>
          <a>Manage</a> 
      </div>
    </div>
  );
};

export default Dropdown;