import React, { useState, useEffect } from 'react';
import ReplyBox from './replyBox.js'; // Ensure the ReplyBox is correctly imported
import ReplyForm from './replyForm.js'; // Ensure the ReplyForm is imported
import '../css/commentBox.css'; // Ensure CSS is linked

const CommentBox = ({
  commentId,
  profilePicUrl,
  commentText,
  isResolved,
  topicTitle,
  name = "Anonymous",
  upvotes,
  createdAt,
  onReplySubmitted // Function passed down to handle new replies
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replies, setReplies] = useState([]);
  const [repliesLoaded, setRepliesLoaded] = useState(false);

  // Formatting the date for display
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: 'numeric', month: 'long', day: 'numeric'
  });

  // Effect to fetch replies when the component mounts
  useEffect(() => {
    const fetchReplies = async () => {
      if (!repliesLoaded) {
        try {
          const response = await fetch(`/comments/${commentId}/replies`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setReplies(data);
          setRepliesLoaded(true);
        } catch (error) {
          console.error("Failed to load replies:", error);
        }
      }
    };

    fetchReplies();
  }, [commentId, repliesLoaded]); // Depend on commentId and repliesLoaded to avoid unnecessary refetches

  // Function to render replies using ReplyBox
  const renderReplies = (replies) => {
    return replies.map((reply) => (
      <div key={reply.commentId || reply.comment_id} className="comment-reply">
        <ReplyBox
          commentId={reply.commentId || reply.comment_id}
          profilePicUrl={reply.profilePicUrl || "path/to/default/profilePic.png"}
          commentText={reply.content}
          isResolved={reply.resolved}
          topicTitle={reply.topic}
          name={reply.name || "Anonymous"}
          upvotes={reply.upvotes || 0}
          createdAt={reply.createdAt}
        />
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
      {/* Conditional rendering of the reply form */}
      {showReplyForm && (
        <div className="reply-form-container">
          <ReplyForm parentId={commentId} onReplySubmitted={onReplySubmitted} />
        </div>
      )}
      {/* Render replies if any and they are loaded */}
      {repliesLoaded && (
        <div className="replies">
          <h5>Replies:</h5>
          {renderReplies(replies)}
        </div>
      )}
    </div>
  );
};

export default CommentBox;
