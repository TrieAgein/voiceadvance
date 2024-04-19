import React, { useState } from 'react';
import Image from 'next/image';
import arrowsSVG from '../public/arrows.svg';
import '../css/page.css';

const deptDropdown = () => {
    const [toggled, setToggled] = useState(false);
  
    return (
        <div className='dropcategory-open'>
            <div className={"dropcategory"+(toggled ? ' open' : '')}>
            <a onClick={()=>{setToggled(!toggled)}} className="category-title">Select your Department...  
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
                    <input type="radio" name="radio-button" value="department" className="checkmark" /> <p className='category-text'>Department 1</p>
                </label>
                
                <label className='check-container'>
                    <input type="radio" name="radio-button" value="department" className="checkmark" /> <p className='category-text'>Department 2</p>
                </label>

                <label className='check-container'>
                    <input type="radio" name="radio-button" value="department" className="checkmark" /> <p className='category-text'>Department 3</p>
                </label>

                <label className="check-container">
                    <input type="radio" name="radio-button" value="department" className="checkmark" /> <p className='category-text'>Department 4</p>
                </label>  
            </>
            )}
        </div>
        </div>
    </div>
    );
};
export default deptDropdown;
