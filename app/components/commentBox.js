import React, { useState, useEffect} from 'react';
import ReplyBox from './replyBox.js'; 
import ReplyForm from './replyForm.js'; 
import EditComment from './editComment.js';
import '../css/commentBox.css'; 
import Image from 'next/image';
import close from '/images/icons/close.svg';

const CommentBox = ({
  commentId,
  profilePicUrl,
  commentText,
  isResolved,
  topicTitle,
  authorId = {}, // Default to an empty object if no author is provided
  upvotes,
  createdAt,
  togglePopup
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState(false);
  const [repliesLoaded, setRepliesLoaded] = useState(false);
  const [currentUpvotes, setCurrentUpvotes] = useState(upvotes);
  const [upvoteSent, setUpvoteSent] = useState(false);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [showReplyFormPopup, setShowReplyFormPopup] = useState(false); // New state for reply form popup

  // Use the name from the author object or "Anonymous" if not provided
  const displayName = authorId.name || "Anonymous";

  useEffect(() => {
    const fetchReplies = async () => {
      if (!repliesLoaded) {
        try {
          const response = await fetch(`/api/comments/${commentId}/replies`);
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          const data = await response.json();
          console.log("Replies fetched:", data); // Check what data looks like
          setReplies(data);
          setRepliesLoaded(true);
        } catch (error) {
          console.error("Failed to load replies:", error);
        }
      }
    };

    fetchReplies();
  }, [commentId, repliesLoaded]);

  const handleUpvote = async (e) => {
    e.stopPropagation(); // Stop propagation here
    const newUpvoteStatus = !hasUpvoted;
    // Determine the new count based on whether the user is upvoting or removing their upvote
    const updatedUpvotes = newUpvoteStatus ? currentUpvotes + 1 : currentUpvotes - 1;

    try {
      const response = await fetch(`/api/upvotes/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ upvotes: updatedUpvotes })
      });

      if (!response.ok) {
        throw new Error('Failed to update upvotes');
      }

      // Update the state only after confirming the server response was OK
      setCurrentUpvotes(updatedUpvotes);
      setHasUpvoted(newUpvoteStatus);
    } catch (error) {
      console.error('Error upvoting comment:', error);
    }
  };

  const onReplySubmitted = (newReply) => {
    setReplies(prevReplies => [...prevReplies, newReply]);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const Toggled = () => {
    setIsToggled(!isToggled);
  };

  const toggleReplyFormPopup = (e) => {
    e.stopPropagation(); // Stop propagation here
    setShowReplyFormPopup(!showReplyFormPopup);
  };

  // Function to handle click on button inside the div
  const handleButtonClick = (e) => {
    e.stopPropagation(); // Stop propagation here
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
                      {displayName} • {new Date(createdAt).toLocaleDateString("en-US", {
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
// import React, { useState, useEffect } from 'react';
// import ReplyBox from './replyBox.js'; 
// import ReplyForm from './replyForm.js'; 
// import EditComment from './editComment.js';
// import '../css/commentBox.css'; 
// import Image from 'next/image';

// const CommentBox = ({
//   name,
//   commentId,
//   profilePicUrl,
//   commentText,
//   isResolved,
//   topicTitle,
//   authorId = {}, // Default to an empty object if no author is provided
//   upvotes,
//   createdAt,
//   togglePopup
// }) => {
//   const [showReplyForm, setShowReplyForm] = useState(false);
//   const [replies, setReplies] = useState([]);
//   const [showReplies, setShowReplies] = useState(false);
//   const [repliesLoaded, setRepliesLoaded] = useState(false);
//   const [currentUpvotes, setCurrentUpvotes] = useState(upvotes);
//   const [upvoteSent, setUpvoteSent] = useState(false);
//   const [hasUpvoted, setHasUpvoted] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isToggled, setIsToggled] = useState(false);

//   // Use the name from the author object or "Anonymous" if not provided
//   const displayName = authorId.name || "Anonymous";

//   useEffect(() => {
//     const fetchReplies = async () => {
//       if (!repliesLoaded) {
//         try {
//           const response = await fetch(`/api/comments/${commentId}/replies`);
//           if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//           const data = await response.json();
//           console.log("Replies fetched:", data); // Check what data looks like
//           setReplies(data);
//           setRepliesLoaded(true);
//         } catch (error) {
//           console.error("Failed to load replies:", error);
//         }
//       }
//     };

//     fetchReplies();
//   }, [commentId, repliesLoaded]);

//   const handleUpvote = async () => {
//     const newUpvoteStatus = !hasUpvoted;
//     // Determine the new count based on whether the user is upvoting or removing their upvote
//     const updatedUpvotes = newUpvoteStatus ? currentUpvotes + 1 : currentUpvotes - 1;

//     try {
//       const response = await fetch(`/api/upvotes/${commentId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ upvotes: updatedUpvotes })
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update upvotes');
//       }

//       // Update the state only after confirming the server response was OK
//       setCurrentUpvotes(updatedUpvotes);
//       setHasUpvoted(newUpvoteStatus);
//     } catch (error) {
//       console.error('Error upvoting comment:', error);
//     }
//   };

//   const onReplySubmitted = (newReply) => {
//     setReplies(prevReplies => [...prevReplies, newReply]);
//   };

//   const toggleEditing = () => {
//     setIsEditing(!isEditing);
//   };

//   return (
//     <div className="comment-box-container">
//       <div className="comment-box">
//         <div className="comment-header">
//           <div> 
//             <h4>{topicTitle}</h4>
//             <a className="comment-meta">
//             {name} • {new Date(createdAt).toLocaleDateString("en-US", {
//                 year: 'numeric', month: 'long', day: 'numeric'
//               })}
//             </a>
//           </div>
//         </div> 
//         <p className="comment-text" onClick={toggleEditing}>{commentText}</p>
//         {isEditing && (
//           <EditComment commentId={commentId} isOpen={isEditing} togglePopup={toggleEditing} />
//         )}
        
//         <div className='status-container'>
//           <div className={`status ${isResolved ? 'resolved' : 'unresolved'}`}>
//               <span className="status-circle"></span>
//               {isResolved ? 'Resolved' : 'Unresolved'}
//           </div> 
//         </div> 
  
//         {!isResolved && (
//           <a onClick={() => setShowReplyForm(!showReplyForm)} className="toggle-replies-form-button">
//             {showReplyForm ? 'Cancel Reply' : 'Reply'}
//           </a>
//         )}
  
//         <a onClick={() => setShowReplies(!showReplies)} className={"toggle-replies-button" + (showReplies ? " active" : "")}>
//         </a>
//         <a onClick={handleUpvote} className={`upvote-button ${hasUpvoted ? 'upvoted' : ''}`}>
//             +{currentUpvotes}
//           </a>
//         {showReplyForm && <ReplyForm parentId={commentId} onReplySubmitted={onReplySubmitted} />}
//         {showReplies && repliesLoaded && (
//           <div className="replies">
//             <h5>Replies:</h5>
//             {replies.map(reply => (
//               <ReplyBox
//                 key={reply.comment_id} // Ensure keys are unique
// 				name={reply.name}
//                 commentId={reply.comment_id} // Pass the correct comment ID
//                 profilePicUrl={reply.profilePicUrl}
//                 commentText={reply.content}
//                 topicTitle={reply.topicTitle}
//                 upvotes={reply.upvotes}
//                 createdAt={reply.createdAt}
//                 isAnonymous={reply.anonymous}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CommentBox;
