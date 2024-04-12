import React, { useState } from 'react';

const CommentSubmitForm = () => {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [parentCommentId, setParentCommentId] = useState(null); // New state to hold the ID of the parent comment if it's a reply
  const [feedback, setFeedback] = useState('');
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
      feedback,
      resolved,
      ...(parentCommentId && { parentCommentId }), // Conditionally add parentCommentId to the payload if it exists
    };

    try {
      // Make the POST request to your API endpoint
      const response = await fetch('/submit-comment', { // Changed to submit-reply to align with reply handling
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Comment submitted successfully:', data);
      // Clear the form fields after successful submission
      setName('');
      setTopic('');
      setContent('');
      setFeedback('');
      setResolved(false);
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
      />
      <input
        type="text"
        placeholder="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="text"
        placeholder="Parent Comment ID (optional for replies)"
        value={parentCommentId || ''}
        onChange={(e) => setParentCommentId(e.target.value ? Number(e.target.value) : null)}
      />
      <textarea
        placeholder="Feedback (optional)"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <label>
        Resolved:
        <input
          type="checkbox"
          checked={resolved}
          onChange={(e) => setResolved(e.target.checked)}
        />
      </label>
      <button type="submit">Submit Comment</button>
    </form>
  );
};

export default CommentSubmitForm;
