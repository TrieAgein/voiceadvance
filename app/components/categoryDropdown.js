import React, { useState } from 'react';
import Image from 'next/image';
import arrowsSVG from '../public/arrows.svg';
import '../css/page.css';

const categoryDropdown= () => {
    const [toggled, setToggled] = useState(false);
  
    return (
    <div className='dropcategory-open'>
        <div className={"dropcategory"+(toggled ? ' open' : '')}>
        <a onClick={()=>{setToggled(!toggled)}} className="category-title">Please Select a Category...  
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
                <input type="radio" name="radio-button" value="leadership" className="checkmark" /> <p className='category-text'>Leadership</p>
            </label>
            
            <label className='check-container'>
                <input type="radio" name="radio-button" value="careerAdvancement" className="checkmark" /> <p className='category-text'>Career Advancement</p>
            </label>

            <label className='check-container'>
                <input type="radio" name="radio-button" value="workScheduling" className="checkmark" /> <p className='category-text'>Improvement Ideas</p>
            </label>

            <label className="check-container">
                <input type="radio" name="radio-button" value="workScheduling" className="checkmark" /> <p className='category-text'>Work Scheduling</p>
            </label>            
        </>
        )}
        </div>
        </div>
    </div>
    );
};
export default categoryDropdown;
