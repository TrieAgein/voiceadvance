import React, { useState } from 'react';
import Image from 'next/image';
import arrowsSVG from '../public/arrows.svg';
import All from './allComments';
import Active from './openComments'; 
import Closed from './closedComments';
import '../css/page.css';

const Dropdown = () => {
  const [toggled, setToggled] = useState(false);

return (
    <div className={"dropdown" + (toggled ? ' open' : '')}>
      <a onClick={() => { setToggled(!toggled) }} className='dr_title'>Comments
        <Image src={arrowsSVG}/>
      </a>
      <div className="content">
          <All/>
          <Active/>
          <Closed/>
      </div>
    </div>
  );
};

export default Dropdown;
