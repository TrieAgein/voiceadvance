import React, { useState, useEffect } from 'react';
import ReplyBox from './replyBox.js'; 
import ReplyForm from './replyForm.js'; 
import EditComment from './editComment.js';
import ResolveComment from "./resolvecomment.js"
import '../css/commentBoxResolver.css'; 
import Image from 'next/image';
import close from '/images/icons/close.svg';

const CommentBox = ({
  name,
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
  const [showReplyFormPopup, setShowReplyFormPopup] = useState(false); // New state for reply form popup
  

  // Use the name from the author object or "Anonymous" if not provided

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

  const toggleReplyFormPopup = (e) => {
    e.stopPropagation(); // Stop propagation here
    setShowReplyFormPopup(!showReplyFormPopup);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const Toggled = () => {
    setIsToggled(!isToggled);
  };

  if (isToggled) {
        
    return (
    <div id ='popup-wrapper'>
    <div className="popup">
      <div className="close-button" onClick={Toggled}>
          <Image src={close} alt="Close" />
      </div>

          
            <div style={{paddingTop: '20px', paddingLeft: '10px'}} className="comment-header">
              <div style={{ marginRight: 'auto' }}>
              <div style={{ width: 'fit-content', display : 'inline-block' }}>
                <h4>{topicTitle}</h4>
                <a className="comment-meta">
                  {name} • {new Date(createdAt).toLocaleDateString("en-US", {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </a>
              </div>
              <a style={{ marginLeft: "20px" }} onClick={handleUpvote} className={`upvote-button ${hasUpvoted ? 'upvoted' : ''}`}>
              +{currentUpvotes}
             </a>
             </div>
              <div style={{ marginLeft: 'auto' }} className={`status ${isResolved ? 'resolved' : 'unresolved'}`}>
                <span className="status-circle"></span>
                {isResolved ? 'Resolved' : 'Unresolved'}
              </div>
              
             
            </div>
            <p className="comment-text" onClick={toggleEditing}>{commentText}</p>
            
              
            
            {!isResolved && (
              <a onClick={(e) => toggleReplyFormPopup(e)} className="toggle-replies-form-button">
                {showReplyFormPopup ? 'Cancel Reply' : 'Reply'}
              </a>

            

            )}
            {!isResolved && (
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
            )}
            
            
            {showReplyFormPopup && <ReplyForm parentId={commentId} onReplySubmitted={onReplySubmitted} />}
            {repliesLoaded && (
              <div className="replies">
                <h5>Replies:</h5>
                {replies.map(reply => (
                  <ReplyBox
                    key={reply.comment_id} // Ensure keys are unique
					name={reply.name}
                    commentId={reply.comment_id} // Pass the correct comment ID
                    profilePicUrl={reply.profilePicUrl}
                    commentText={reply.content}
                    topicTitle={reply.topicTitle}
                    upvotes={reply.upvotes}
                    createdAt={reply.createdAt}
                    isAnonymous={reply.anonymous}
                  />
                ))}
              </div>
            )}
          

      </div>
    </div>
  )} else {
    return (<div className="claim-wrapper" onClick={Toggled}>
    <div className={`status ${isResolved ? ' filled' : ''}`}><div></div>{isResolved ? 'Resolved' : 'Unresolved'}</div>
    <div className="title">{topicTitle}</div>
    <hr/>
    <div className="description">{commentText}</div>
    <a onClick={handleUpvote} className={`upvote ${hasUpvoted ? 'upvoted' : ''}`}>
      +{currentUpvotes}
    </a>
  </div>)
  }
};

export default CommentBox;

