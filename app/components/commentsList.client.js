import React, { useEffect, useState } from 'react';
import CommentBox from './commentBox.js'; // Ensure this component can recursively display replies

const CommentsList = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('/comments');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setComments(data); // Assume data is structured with replies nested within each comment
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    fetchComments();
  }, []);

  const handleReplySubmitted = (newReply) => {
    // Simple approach: Add the reply to the top-level state and re-fetch or update locally
    setComments(prev => [...prev, newReply]); // Simplified: you'll need to find the correct comment to append this reply
  };
  
  // Function to recursively render comments and their replies
  const renderComments = (comments) => {
    return comments.map((comment) => (
      <CommentBox
        key={comment.comment_id}
        commentId={comment.comment_id}
        profilePicUrl="path/to/default/profilePic.png"
        commentText={comment.content}
        isResolved={comment.resolved}
        topicTitle={comment.topic}
        name={comment.name}
        upvotes={comment.upvotes}
        createdAt={comment.createdAt}
        replies={renderComments(comment.replies || [])}
        onReplySubmitted={handleReplySubmitted}
      />
    ));
  };

  return (
    <div>
      {renderComments(comments)}
    </div>
  );
};

export default CommentsList;