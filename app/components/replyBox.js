import React from 'react';
import '../css/commentBox.css'; // Using the same styling, you may choose to customize this further for replies

const ReplyBox = ({
  profilePicUrl,
  commentText,
  topicTitle,
  name = "Anonymous", // Default name if none is provided
  upvotes,
  createdAt
}) => {
  // Formatting the date for display
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="comment-box reply-box"> {/* Added 'reply-box' class for potential specific styling */}
      <div className="comment-header">
        <img src={profilePicUrl || "path/to/default/profilePic.png"} alt={`${name}'s profile`} className="profile-pic" />
        <div>
          <h4>{topicTitle}</h4>
          <p className="comment-meta">
            {name} · {upvotes} Upvotes · {formattedDate}
          </p>
        </div>
      </div>
      <p className="comment-text">{commentText}</p>
    </div>
  );
};

export default ReplyBox;