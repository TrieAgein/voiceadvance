import React, { useState } from 'react';
import Image from 'next/image';
import arrowsSVG from '../public/arrows.svg';
import '../css/page.css';

const Dropdown = () => {
  const [toggled, setToggled] = useState(false);

  return (
    <div className={"dropdown" + (toggled ? ' open' : '')}>
      <a onClick={() => { setToggled(!toggled) }} className='title'>Users
        <div className={"title-img" + (toggled ? ' ' : '')}>
          <div className='img'>
            <Image src={arrowsSVG} />
          </div>
        </div>
      </a>
      <div className="content">
          <a>Add New Employee</a>
          <a>Update Employee</a>
          <a>View All Employee's</a> 
      </div>
    </div>
  );
};

export default Dropdown;
