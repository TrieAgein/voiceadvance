import React, { useState, useEffect } from 'react';
import '../css/commentBox.css'; // Using the same styling, you may choose to customize this further for replies

const ReplyBox = ({
  profilePicUrl,
  commentText,
  topicTitle,
  name = {}, // Default name if none is provided will be handled externally
  upvotes,
  createdAt,
  isAnonymous = true // Assume anonymous by default if not specified
}) => {

  const [hasUpvoted, setHasUpvoted] = useState(false);
  // Formatting the date for display
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  
  const handleUpvote = async () => {
    try { 
      let updatedUpvotes = currentUpvotes;
      if (!hasUpvoted){
        updatedUpvotes += 1;
      }
      else {
        updatedUpvotes -= 1;
      }
    
      const response = await fetch(`/api/upvotes/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ upvotes: currentUpvotes + 1 })
      });
  
      if (!response.ok) {
        throw new Error('Failed to update upvotes');
      }
  
      setCurrentUpvotes(updatedUpvotes);
      setHasUpvoted(!hasUpvoted);
    } catch (error) {
      console.error('Error upvoting comment:', error);
    }
  }

  const displayName = isAnonymous ? "Anonymous" : name;

  return (
    <div className="comment-box reply-box"> {/* Added 'reply-box' class for potential specific styling */}
      <div className="comment-header">
        <div>
          <p className="comment-meta">
            {displayName} · {upvotes} Upvotes · {formattedDate}
          </p>
        </div>
        <div className='status-container'>
        <button onClick={handleUpvote} className={`upvote-button ${hasUpvoted ? 'upvoted' : ''}`}>
          {hasUpvoted ? 'Remove' : 'Upvote'}
        </button>
        </div> 
      </div>
      <p className="comment-text">{commentText}</p>
    </div>
  );
};

export default ReplyBox;
