import React, { useState, useEffect } from 'react';
import ReplyBox from './replyBox.js'; 
import ReplyForm from './replyForm.js'; 
import EditComment from './editComment.js';
import ResolveComment from "./resolvecomment.js"
import '../css/commentBoxResolver.css'; 
import Image from 'next/image';

const CommentBox = ({
  commentId,
  profilePicUrl,
  commentText,
  isResolved,
  topicTitle,
  authorId = {}, // Default to an empty object if no author is provided
  upvotes,
  createdAt,
  onReplySubmitted,
  togglePopup
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);
  const [repliesLoaded, setRepliesLoaded] = useState(false);
  const [currentUpvotes, setCurrentUpvotes] = useState(upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isToggled, setIsToggled] = useState(false);

  // Use the name from the author object or "Anonymous" if not provided
  const displayName = authorId.name || "Anonymous";

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

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="comment-box-container">
      
      <div className="comment-box">
      
        <div className="comment-header">
          <div> 
            <h4>{topicTitle}</h4>
            <a className="comment-meta">
            {displayName} • {new Date(createdAt).toLocaleDateString("en-US", {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </a>
          </div>
        </div> 
        <p className="comment-text" onClick={toggleEditing}>{commentText}</p>
        {isEditing && (
          <EditComment commentId={commentId} isOpen={isEditing} togglePopup={toggleEditing} />
        )}
        
        <div className='status-container'>
          <div className={`status ${isResolved ? 'resolved' : 'unresolved'}`}>
              <span className="status-circle"></span>
              {isResolved ? 'Resolved' : 'Unresolved'}
          </div> 
        </div> 
        <div>
            <ResolveComment 
				commentId={commentId}
				profilePicUrl={profilePicUrl}
				commentText={commentText}
				isResolved={isResolved}
				topicTitle={topicTitle}
				authorId={authorId}
				upvotes={upvotes}
				createdAt={createdAt}
				onReplySubmitted={onReplySubmitted}
			/>
        </div><br/><br/>
        <a onClick={() => setShowReplyForm(!showReplyForm)} className="toggle-replies-form-button">
          {showReplyForm ? 'Cancel Reply' : 'Reply'}
          </a>
        <a onClick={() => setShowReplies(!showReplies)} className={"toggle-replies-button" + (showReplies ? " active" : "")}>
        </a>
        <a onClick={handleUpvote} className={`upvote-button ${hasUpvoted ? 'upvoted' : ''}`}>
          {hasUpvoted ? "+"+currentUpvotes : "+"+currentUpvotes}
          </a>
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

