import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import close from '/images/icons/close.svg';
import DeptDropdown from './deptDropdown';
import PriorityDropdown from './priorityDropdown';
import CategoryDropdown from './categoryDropdown';
import '../css/page.css';

const EditComment = ({ commentId }) => {  // Assuming commentId is passed as a prop
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [department, setDepartment] = useState('');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('');

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const setDepartmentState = useCallback(val => {
    setDepartment(val);
  }, []);

  const setPriorityState = useCallback(val => {
    setPriority(val);
  }, []);

  const setCategoryState = useCallback(val => {
    setCategory(val);
  }, []);

  const handleSubmit = async () => {
    const payload = {
      topic,
      content,
      department,
      priority,
      category,
    };

    try {
      const response = await fetch(`/api/edit-comment/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Error updating comment');
      }

      console.log('Comment updated successfully:', result);
      togglePopup();  // Close the popup after successful update
    } catch (error) {
      console.error('Failed to update comment:', error);
    }
  };

  return (
    <>
      {!isOpen && (
                <button className="edit-button" onClick={togglePopup}>Edit Comment <span>+</span></button>
      )}
      {isOpen && (
        <div id='popup-wrapper'>
          <div className='popup'>
            <div className="close-button" onClick={togglePopup}>
              <Image src={close} alt="Close" />
            </div>
            <div id="popup-body">
              <h1>Edit Comment</h1>
              <h2 className='asterisk'>Comment Title</h2>
              <input
                style={{ width: '100%', padding: '5px', border: 'solid black'}}
                type="text"
                placeholder="Enter Title here..."
                value={topic}
                onChange={e => setTopic(e.target.value)}
              />
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
                onChange={e => setContent(e.target.value)}
              ></textarea>
              <div className="close-button">
                <button className='submit-comment' onClick={handleSubmit}>Save Comment</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EditComment;
