import React, { useState, useEffect, use } from 'react';
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
  onReplySubmitted, 
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);
  const [repliesLoaded, setRepliesLoaded] = useState(false);
  const [currentUpvotes, setCurrentUpvotes] = useState(upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);

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

  // upvotes
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
            <a className="comment-meta">
              
            {name ? name : "Anonymous"} • {new Date(createdAt).toLocaleDateString("en-US", {
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
        </a>
        <a onClick={() => setShowReplies(!showReplies)} className={"toggle-replies-button" + (showReplies ? " active" : "")}>
        </a>
        <a onClick={handleUpvote} className={`upvote-button ${hasUpvoted ? 'upvoted' : ''}`}>
          {hasUpvoted ? "+"+currentUpvotes : "+"+currentUpvotes}</a>
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
