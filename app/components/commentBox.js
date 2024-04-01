import React from 'react';

import '../css/CommentBox.css';

const CommentBox = ({ profilePicUrl, commentText, isResolved, topicTitle }) => (
  <div className="comment-box">
    <div className="comment-header">
      <img src={profilePicUrl} alt="Profile" className="profile-pic" />
      <h4>{topicTitle}</h4>
    </div>
    <p className="comment-text">{commentText}</p>
    <div className={`status ${isResolved ? 'resolved' : 'unresolved'}`}>
      {isResolved ? 'Resolved' : 'Unresolved'}
    </div>
  </div>
);

export default CommentBox;