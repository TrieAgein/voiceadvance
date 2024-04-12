import React from 'react';
import '../css/commentBox.css';

const CommentBox = ({
  profilePicUrl,
  commentText,
  isResolved,
  topicTitle,
  name = "Anonymous", // Default to "Anonymous" if no name is provided
  upvotes,
  createdAt,
  replies = [] // Assuming replies are passed as an array of comment objects
}) => {
  // Optional: Format createdAt date string for display
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  // Function to render replies recursively
  const renderReplies = (replies) => {
    return replies.map((reply, index) => (
      <div key={index} className="comment-reply">
        <CommentBox {...reply} />
      </div>
    ));
  };

  return (
    <div className="comment-box">
      <div className="comment-header">
        <img src={profilePicUrl || "path/to/default/profilePic.png"} alt="Profile" className="profile-pic" />
        <div>
          <h4>{topicTitle}</h4>
          <p className="comment-meta">
            {name} · {upvotes} Upvotes · {formattedDate}
          </p>
        </div>
      </div>
      <p className="comment-text">{commentText}</p>
      <div className={`status ${isResolved ? 'resolved' : 'unresolved'}`}>
        {isResolved ? 'Resolved' : 'Unresolved'}
      </div>
      {/* Render replies if any */}
      {replies.length > 0 && (
        <div className="replies">
          <h5>Replies:</h5>
          {renderReplies(replies)}
        </div>
      )}
    </div>
  );
};

export default CommentBox;