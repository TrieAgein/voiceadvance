import React, { useState } from 'react';
import Image from 'next/image';
import arrowsSVG from '../public/arrows.svg';
import '../css/page.css';

const priorityDropdown = () => {
    const [toggled, setToggled] = useState(false);
  
    return (
    <div className='dropcategory-open'>
        <div className={"dropcategory"+(toggled ? ' open' : '')}>
        <a onClick={()=>{setToggled(!toggled)}} className="category-title">Please Select a Priority Level...  
        <div className={"tie-img" + (toggled ? ' ': ' ')}>
            <div className='img'>
            <Image src={arrowsSVG} />
            </div>
        </div>
        </a>
        <div>
        {toggled && (
        <>
            <label className='check-container'>
                <input type="radio" name="radio-button" value="department" className="checkmark" /> <p className='category-text'>Low 1</p>
            </label>
            
            <label className='check-container'>
                <input type="radio" name="radio-button" value="department" className="checkmark" /> <p className='category-text'>Moderate 2</p>
            </label>

            <label className='check-container'>
                <input type="radio" name="radio-button" value="department" className="checkmark" /> <p className='category-text'>High 3</p>
            </label> 
        </>
        )}
        </div>
        </div>
    </div>
    );
};
export default priorityDropdown;