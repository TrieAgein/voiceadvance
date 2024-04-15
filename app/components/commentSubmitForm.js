import React, { useState } from 'react';
import '../css/commentSubmitForm.css';  // Assuming the CSS is saved in this file.

const CommentSubmitForm = () => {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [parentCommentId, setParentCommentId] = useState(null);
  const [anonymous, setAnonymous] = useState(false);
  const [resolved, setResolved] = useState(false);
  const authorId = 1; // Assuming authorId is known and static for this example; adjust as needed

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from causing a page reload

    // Prepare the payload based on your API's expected schema, include parentCommentId only if it's provided
    const payload = {
      name,
      topic,
      content,
      authorId,
      anonymous,
      resolved,
      ...(parentCommentId && { parentCommentId }), // Conditionally add parentCommentId to the payload if it exists
    };

    try {
      // Make the POST request to your API endpoint
      const response = await fetch('/api/submit-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.text();  // or response.json() if the server sends JSON
        throw new Error(`HTTP error! status: ${response.status}, Body: ${errorBody}`);
    }

      const data = await response.json();
      console.log('Comment submitted successfully:', data);
      // Clear the form fields after successful submission
      setName('');
      setTopic('');
      setContent('');
      setResolved(false);
      setAnonymous(false);
      setParentCommentId(null); // Reset parentCommentId as well
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-submit-form">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="form-input"
      />
      <input
        type="text"
        placeholder="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="form-input"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="form-textarea"
      />
      <div className="form-checkbox">
        <label>
          Anonymous:
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            className="checkbox-input"
          />
        </label>
      </div>
      <button type="submit" className="submit-button">Submit Comment</button>
    </form>
  );
};

export default CommentSubmitForm;
