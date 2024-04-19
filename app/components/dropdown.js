import React, { useState } from 'react';
import Image from 'next/image';
import arrowsSVG from '../public/arrows.svg';
import '../css/page.css';

const Dropdown = () => {
  const [toggled, setToggled] = useState(false);

  return (
    <div className={"dropdown" + (toggled ? ' open' : '')}>
      <a onClick={() => { setToggled(!toggled) }} className='title'>Comments
        <div className={"title-img" + (toggled ? ' ' : '')}>
          <div className='img'>
            <Image src={arrowsSVG} />
          </div>
        </div>
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