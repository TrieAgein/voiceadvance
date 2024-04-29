import React, { useState } from 'react';
import '../css/replyForm.css'; // Ensure the CSS is imported correctly

const ReplyForm = ({ parentId, onReplySubmitted }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // To manage the UI state during submission
  const [anonymous, setAnonymous] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Begin submission, update UI to show loading state
    try {
      const response = await fetch('/api/submit-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          parentCommentId: parentId, // Ensure this matches your backend schema
          anonymous,
          authorId: 1, // Replace with actual user ID from your auth context or props
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newReply = await response.json();
      onReplySubmitted(newReply); // Use the callback to handle the new reply in the parent component
      setContent(''); // Clear the input after successful submission
    } catch (error) {
      console.error("Failed to submit reply:", error);
      alert("Failed to submit reply: " + error.message); // Optionally notify the user of an error in a simple way
    } finally {
      setIsSubmitting(false); // Reset submission state regardless of the outcome
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reply-form">
      <textarea
        className="reply-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a reply..."
        required
        disabled={isSubmitting} // Disable the textarea during submission
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
      <button className="reply-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Reply'}
      </button>

    </form>
  );
};

export default ReplyForm;
