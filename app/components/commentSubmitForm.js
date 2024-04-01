import React, { useState } from 'react';

const CommentSubmitForm = ({ onSubmit }) => {
  const [commentText, setCommentText] = useState('');
  const [topicTitle, setTopicTitle] = useState('');
  const [isResolved, setIsResolved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from causing a page reload
    // Assuming the onSubmit function expects an object with commentText, topicTitle, and isResolved
    onSubmit({ commentText, topicTitle, isResolved });
    // Clear the form fields after submission
    setCommentText('');
    setTopicTitle('');
    setIsResolved(false);
  };

  return (
    <form onSubmit={handleSubmit} className="comment-submit-form">
      <div>
        <label htmlFor="topicTitle">Topic Title:</label>
        <input
          type="text"
          id="topicTitle"
          value={topicTitle}
          onChange={(e) => setTopicTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="commentText">Comment:</label>
        <textarea
          id="commentText"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isResolved}
            onChange={(e) => setIsResolved(e.target.checked)}
          />
          Resolved?
        </label>
      </div>
      <button type="submit">Submit Comment</button>
    </form>
  );
};

export default CommentSubmitForm;