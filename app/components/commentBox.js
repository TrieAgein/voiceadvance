import React, { useState } from 'react';
import ReplyForm from './replyForm.js'; // Ensure the ReplyForm is correctly imported
import '../css/commentBox.css'; // Ensure CSS is correctly linked

const CommentBox = ({
  commentId, // This prop is the ID of the comment, used to link replies
  profilePicUrl,
  commentText,
  isResolved,
  topicTitle,
  name = "Anonymous", // Default name if none is provided
  upvotes,
  createdAt,
  replies = [], // Initial replies array, could be empty
  onReplySubmitted // Function passed down to handle new replies
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  // Formatting the date for display
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  // Function to render replies recursively, allowing nested comments
  const renderReplies = (replies) => {
    return replies.map((reply, index) => (
      <div key={index} className="comment-reply">
        <CommentBox {...reply} onReplySubmitted={onReplySubmitted} />
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
      {/* Toggle button for showing/hiding the reply form */}
      <button onClick={() => setShowReplyForm(!showReplyForm)} className="toggle-reply-button">
        {showReplyForm ? 'Cancel' : 'Reply'}
      </button>
      {/* Conditional rendering of the reply form, passing the current commentId as parentId */}
      {showReplyForm && (
        <div className="reply-form-container">
          <ReplyForm parentId={commentId} onReplySubmitted={onReplySubmitted} />
        </div>
      )}
      {/* Recursively render replies if any */}
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