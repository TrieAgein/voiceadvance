import React, { useState, useEffect } from 'react';
import ReplyBox from './replyBox.js'; 
import ReplyForm from './replyForm.js'; 
import EditComment from './editComment.js';
import '../css/commentBox.css'; 
import Image from 'next/image';

const CommentBox = ({
  commentId,
  profilePicUrl,
  commentText,
  isResolved,
  topicTitle,
  name = "Anonymous",
  upvotes,
  createdAt,
  onReplySubmitted
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);
  const [repliesLoaded, setRepliesLoaded] = useState(false);

  useEffect(() => {
    const fetchReplies = async () => {
      if (!repliesLoaded) {
        try {
          const response = await fetch(`/api/comments/${commentId}/replies`);
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          const data = await response.json();
          setReplies(data);
          setRepliesLoaded(true);
        } catch (error) {
          console.error("Failed to load replies:", error);
        }
      }
    };

    fetchReplies();
  }, [commentId, repliesLoaded]);

  return (
    <div className="comment-box-container">
      <div className="comment-box">
        <div className="comment-header">
          <div>
            <h4>{topicTitle}</h4>
            <p className="comment-meta">
              {name} · {upvotes} Upvotes · {new Date(createdAt).toLocaleDateString("en-US", {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </p>
          </div>
        </div>
        <p className="comment-text">{commentText}</p>
        <div className='status-container'>
          <div className={`status ${isResolved ? 'resolved' : 'unresolved'}`}>
              <span className="status-circle"></span>
              {isResolved ? 'Resolved' : 'Unresolved'}
          </div>
          <EditComment commentId={commentId} />
        </div>
        <button onClick={() => setShowReplyForm(!showReplyForm)} className="toggle-replies-form-button">
          {showReplyForm ? 'Cancel Reply' : 'Reply'}
        </button>
        <button onClick={() => setShowReplies(!showReplies)} className="toggle-replies-button">
          {showReplies ? 'Hide Replies' : 'Show Replies'}
        </button>
        {showReplyForm && <ReplyForm parentId={commentId} onReplySubmitted={onReplySubmitted} />}
        {showReplies && repliesLoaded && (
          <div className="replies">
            <h5>Replies:</h5>
            {replies.map(reply => (
              <ReplyBox key={reply.commentId} {...reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentBox;

