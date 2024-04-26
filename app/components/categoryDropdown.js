import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import arrowsSVG from '../public/arrows.svg';
import '../css/page.css';

const categoryDropdown= ({categorySetter}) => {
    const [toggled, setToggled] = useState(false);
	const [category, setCategory] = useState('');
	
	useEffect(() => {
		categorySetter(category);
	}, [categorySetter, category]);

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };
  
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
					<input type="radio" name="radio-button3" value="Leadership" className="checkmark" onChange={handleCategoryChange}/> <p className='category-text'>Leadership</p>
				</label>
				
				<label className='check-container'>
					<input type="radio" name="radio-button3" value="Career Advancement" className="checkmark" onChange={handleCategoryChange}/> <p className='category-text'>Career Advancement</p>
				</label>

				<label className='check-container'>
					<input type="radio" name="radio-button3" value="Improvement Ideas" className="checkmark" onChange={handleCategoryChange}/> <p className='category-text'>Improvement Ideas</p>
				</label>

				<label className="check-container">
					<input type="radio" name="radio-button3" value="Work Scheduling" className="checkmark" onChange={handleCategoryChange}/> <p className='category-text'>Work Scheduling</p>
				</label>            
			</>
			)}
			</div>
			</div>
		</div>
    );
};
export default categoryDropdown;
