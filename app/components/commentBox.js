import React from 'react';
import '../css/commentBox.css';

// Updated to include new props: name, upvotes, and createdAt
const CommentBox = ({
  profilePicUrl,
  commentText,
  isResolved,
  topicTitle,
  name = "Anonymous", // Defaulting to "Anonymous" if no name is provided
  upvotes,
  createdAt
}) => {
  // Optional: Format createdAt date string for display
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="comment-box">
      <div className="comment-header">
        <img src={profilePicUrl} alt="Profile" className="profile-pic" />
        <div>
          <h4>{topicTitle}</h4>
          {/* Displaying name and upvotes if provided */}
          <p className="comment-meta">
            {name} · {upvotes} Upvotes · {formattedDate}
          </p>
        </div>
      </div>
      <p className="comment-text">{commentText}</p>
      <div className={`status ${isResolved ? 'resolved' : 'unresolved'}`}>
        {isResolved ? 'Resolved' : 'Unresolved'}
      </div>
    </div>
  );
};

export default CommentBox;
