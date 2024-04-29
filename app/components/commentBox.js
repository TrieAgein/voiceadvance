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
  author = {}, // Default to an empty object if no author is provided
  upvotes,
  createdAt,
  onReplySubmitted, 
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);
  const [repliesLoaded, setRepliesLoaded] = useState(false);
  const [currentUpvotes, setCurrentUpvotes] = useState(upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  // Use the name from the author object or "Anonymous" if not provided
  const displayName = author.name || "Anonymous";

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

  const handleUpvote = async () => {
    try { 
      let updatedUpvotes = currentUpvotes;
      if (!hasUpvoted){
        updatedUpvotes += 1;
      }
      else {
        updatedUpvotes -= 1;
      }
    
      const response = await fetch(`/api/upvotes/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ upvotes: currentUpvotes + 1 })
      });
  
      if (!response.ok) {
        throw new Error('Failed to update upvotes');
      }
  
      setCurrentUpvotes(updatedUpvotes);
      setHasUpvoted(!hasUpvoted);
    } catch (error) {
      console.error('Error upvoting comment:', error);
    }
  };

  return (
    <div className="comment-box-container">
      
      <div className="comment-box">
      
        <div className="comment-header">
          <div> 
            <h4>{topicTitle}</h4>
            <p className="comment-meta">
              {displayName} · {currentUpvotes} Upvotes · {new Date(createdAt).toLocaleDateString("en-US", {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </a>
          </div>
        </div> 
        <EditComment commentId={commentId}/>
        <p onClick="THIS NEEDS TO TRIGGER AN ONCLICK EVENT ON THE NODE ABOVE THIS" className="comment-text">{commentText}</p> 
        
        <div className='status-container'>
          <div className={`status ${isResolved ? 'resolved' : 'unresolved'}`}>
              <span className="status-circle"></span>
              {isResolved ? 'Resolved' : 'Unresolved'}
          </div> 
        </div> 
        
        <a onClick={() => setShowReplyForm(!showReplyForm)} className="toggle-replies-form-button">
          {showReplyForm ? 'Cancel Reply' : 'Reply'}
        </button>
        <button onClick={() => setShowReplies(!showReplies)} className="toggle-replies-button">
          {showReplies ? 'Hide Replies' : 'Show Replies'}
        </button>
        <button onClick={handleUpvote} className={`upvote-button ${hasUpvoted ? 'upvoted' : ''}`}>
          {hasUpvoted ? 'Remove' : 'Upvote'}
        </button>
        {showReplyForm && <ReplyForm parentId={commentId} onReplySubmitted={onReplySubmitted} />}
        {showReplies && repliesLoaded && (
          <div className="replies">
            <h5>Replies:</h5>
            {replies.map(reply => (
              <ReplyBox
              key={reply.commentId || reply.id} // Ensure key is unique and correctly referenced
              profilePicUrl={reply.profilePicUrl} // Ensure you pass this if needed
              commentText={reply.content} // Make sure 'content' is the correct field name
              topicTitle={reply.topicTitle} // Adjust if necessary
              name={reply.authorId.name} // Check if 'author' is populated and 'name' exists
              upvotes={reply.upvotes}
              createdAt={reply.createdAt}
              isAnonymous={reply.anonymous}
            />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentBox;
