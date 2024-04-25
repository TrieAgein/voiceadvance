import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import close from '/images/icons/close.svg';
import DeptDropdown from './deptDropdown';
import PriorityDropdown from './priorityDropdown';
import CategoryDropdown from './categoryDropdown';
import '../css/page.css';

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [department, setDepartment] = useState('');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('');
  const [parentCommentId, setParentCommentId] = useState(null);
  const [anonymous, setAnonymous] = useState(false);
  const [resolved, setResolved] = useState(false);
  const authorId = 1; // Assuming authorId is known and static for this example; adjust as needed

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  
  const setDepartmentState = useCallback(val => {
	  setDepartment(val);
  }, [setDepartment]);
  
  const setPriorityState = useCallback(val => {
	  setPriority(val);
  }, [setPriority]);
  
  const setCategoryState = useCallback(val => {
	  setCategory(val);
  }, [setCategory]);
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from causing a page reload

    // Prepare the payload based on your API's expected schema, include parentCommentId only if it's provided
    const payload = {
      name,
      topic,
      content,
      authorId,
      anonymous,
      resolved,
	  department,
	  priority,
	  category,
      ...(parentCommentId && { parentCommentId }), // Conditionally add parentCommentId to the payload if it exists
    };

    try {
      // Make the POST request to your API endpoint
      const response = await fetch('/api/submit-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.text();  // or response.json() if the server sends JSON
        throw new Error(`HTTP error! status: ${response.status}, Body: ${errorBody}`);
    }

      const data = await response.json();
      console.log('Comment submitted successfully:', data);
      // Clear the form fields after successful submission
      setName('');
      setTopic('');
      setContent('');
	  setDepartment('');
	  setPriority('');
	  setCategory('');
      setResolved(false);
      setAnonymous(false);
      setParentCommentId(null); // Reset parentCommentId as well
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };

  return (
    <>
      {/* Show the "New Comment" button only when the popup is closed */}
      {!isOpen && (
        <a className="button" onClick={togglePopup}>New Comment <span style={{ fontSize: '150%' }}>+</span></a>
      )}
      {/* Show the popup when isOpen is true */}
      {isOpen && (
        <div id='popup-wrapper'>
          <div className='popup'>
            <div className="close-button" onClick={togglePopup}>
              <Image 
              src={close} 
              alt="close"
              />
            </div>
            <div id="popup-body">
              <h1>New Comment</h1>
              <h2 className='asterisk'>Comment Title</h2>
              <input style={{ width: '100%', padding: '5px', border: 'solid black'}} type="text" value={topic} placeholder="Enter Title here..." onChange={(e) => setTopic(e.target.value)}/>
              <div className='category-container'>
                <div className='item'>
                  <h3 className='asterisk'>Select your Department</h3>
                  <DeptDropdown department={department} departmentSetter={setDepartmentState}/>
                </div>
                <div className='item'>
                  <h3 className='asterisk'>Select Priority Level</h3>
                  <PriorityDropdown priority={priority} prioritySetter={setPriorityState}/>
                </div>
                <div className='item'>
                  <h3 className='asterisk'>Category</h3>
                  <CategoryDropdown category={category} categorySetter={setCategoryState}/>
                </div>
              </div><br/>
              <textarea
                style={{ width: '100%', height: '200px', padding: '5px', resize: 'none', border: 'solid black'}}
                placeholder="Your comment here..."
				value={content}
				onChange={(e) => setContent(e.target.value)}
              ></textarea>
              < div className="close-button" onClick={togglePopup}>
                  <a className='submit-comment' onClick={handleSubmit}>Submit</a>
              </div>
              <div className='close-button' onClick={togglePopup}>
                <a className='save-comment'>Save Comment</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Popup;
