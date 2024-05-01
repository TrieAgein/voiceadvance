import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import close from '/images/icons/close.svg';
import CommentBox from './commentBoxResolver'; 
import '../css/page.css';

const ResolveComment = ({ commentId }) => {  
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async () => {
    const payload = {
      status: 'resolved', // Assuming the server expects a status field to mark as resolved
      // Include any other data the server may need
    };
  
    try {
      const response = await fetch(`/api/resolve-comment/${commentId}`, { // Notice the endpoint change
        method: 'PUT', // or 'POST', or 'PATCH', depending on your API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || 'Error resolving comment');
      }
  
      console.log('Comment resolved successfully:', result);
      togglePopup(); // Close the popup after successful resolution
    } catch (error) {
      console.error('Failed to resolve comment:', error);
    }
  };
  

  return (
    <>
      {!isOpen && (
        <button className="edit-button" onClick={togglePopup}>Resolve Comment <span>+</span></button>
      )}
      {isOpen && (
        <div id='popup-wrapper'>
          <div className='popup'>
            <div className="close-button" onClick={togglePopup}>
              <Image src={close} alt="Close" />
            </div>
            <div id="popup-body">
              <h1>Resolve Comment</h1>
              <CommentBox />  {/* This is where CommentBoxResolver is included */}
              <div className='category-container'>

              </div><br/>
              <textarea
                style={{ width: '100%', height: '200px', padding: '5px', resize: 'none', border: 'solid black'}}
                placeholder="Your response here..."
                value={content}
                onChange={e => setContent(e.target.value)}
              ></textarea>
              <div className="close-button">
                <a className='submit-comment' onClick={handleSubmit}>Resolve Comment</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ResolveComment;
