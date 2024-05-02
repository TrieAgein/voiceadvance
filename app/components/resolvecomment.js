import React, { useState, useEffect, useCallback } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import close from '/images/icons/close.svg';
import CommentBox from './commentBoxResolver'; 
import '../css/page.css';

const ResolveComment = ({
  commentId,
  profilePicUrl,
  commentText,
  isResolved,
  topicTitle,
  authorId = {}, // Default to an empty object if no author is provided
  upvotes,
  createdAt,
  onReplySubmitted
}) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [resolverId, setResolverId] = useState(0);
  
  useEffect(() => {
	if (session) {
		setName(session.user.name);
		setResolverId(session.user.id);
	}
  }, [session]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  

  const handleSubmit = async () => {
    const payload = {
      name,
	  topic: "Response",
	  content,
	  authorId: resolverId,
	  resolved: true,
	  parentCommentId: commentId,
    };
  
    try {
      const response = await fetch(`/api/submit-comment`, { // Notice the endpoint change
        method: 'POST', // or 'POST', or 'PATCH', depending on your API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || 'Error resolving comment');
      }
	  
	  const response2 = await fetch(`api/resolve-comment?commentId={commentId}`, {
		  method: 'PUT',
		  headers: {
			  'Content-Type': 'application/json',
		  },
		  body: commentId
	  });
	  
	  const result2 = await response.json();
	  
	  if (!response2.ok) {
        throw new Error(result2.message || 'Error resolving comment');
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
              <CommentBox 
				commentId={commentId}
				profilePicUrl={profilePicUrl}
				commentText={commentText}
				isResolved={isResolved}
				topicTitle={topicTitle}
				authorId={authorId}
				upvotes={upvotes}
				createdAt={createdAt}
				onReplySubmitted={onReplySubmitted}
			  />
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
