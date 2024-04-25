import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import arrowsSVG from '../public/arrows.svg';
import '../css/page.css';

const deptDropdown = ({departmentSetter}) => {
    const [toggled, setToggled] = useState(false);
	const [department, setDepartment] = useState('');
	
	useEffect(() => {
		departmentSetter(department);
	}, [departmentSetter, department]);

    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
    };
  
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
                    <input type="radio" name="radio-button" value="Department 1" className="checkmark" onChange={handleDepartmentChange} checked={department === "Department 1"}/> <p className='category-text'>Department 1</p>
                </label>
                
                <label className='check-container'>
                    <input type="radio" name="radio-button" value="Department 2" className="checkmark" onChange={handleDepartmentChange} checked={department === "Department 2"}/> <p className='category-text'>Department 2</p>
                </label>

                <label className='check-container'>
                    <input type="radio" name="radio-button" value="Department 3" className="checkmark" onChange={handleDepartmentChange} checked={department === "Department 3"}/> <p className='category-text'>Department 3</p>
                </label>

                <label className="check-container">
                    <input type="radio" name="radio-button" value="Department 4" className="checkmark" onChange={handleDepartmentChange} checked={department === "Department 4"}/> <p className='category-text'>Department 4</p>
                </label>  
            </>
            )}
        </div>
        </div>
    </div>
    );
};
export default deptDropdown;
