import React, { useState } from 'react';
import '../css/commentBox.css'; // Using the same styling, you may choose to customize this further for replies

const ReplyBox = ({
  name,
  commentId,
  commentText,
  upvotes,
  createdAt,
  isAnonymous = true // Assume anonymous by default if not specified
}) => {
  const [currentUpvotes, setCurrentUpvotes] = useState(upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  // Formatting the date for display
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  const handleUpvote = async () => {
    const newUpvoteStatus = !hasUpvoted;
    // Determine the new count based on whether the user is upvoting or removing their upvote
    const updatedUpvotes = newUpvoteStatus ? currentUpvotes + 1 : currentUpvotes - 1;

    try {
      const response = await fetch(`/api/upvotes/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ upvotes: updatedUpvotes })
      });

      if (!response.ok) {
        throw new Error('Failed to update upvotes');
      }

      // Update the state only after confirming the server response was OK
      setCurrentUpvotes(updatedUpvotes);
      setHasUpvoted(newUpvoteStatus);
    } catch (error) {
      console.error('Error upvoting comment:', error);
    }
  };

  const displayName = isAnonymous ? "Anonymous" : name;

  return (
    <div className="comment-box reply-box">
      <div className="comment-header">
        <div>
          <p className="comment-meta">
            {displayName} • {formattedDate}
          </p>
        </div>
        <div className='status-container'>
          <a onClick={handleUpvote} className={`upvote-button ${hasUpvoted ? 'upvoted' : ''}`}>
            +{currentUpvotes}
          </a>
        </div> 
      </div>
      <p className="comment-text">{commentText}</p>
    </div>
  );
};

export default ReplyBox;