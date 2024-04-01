import React, { useEffect, useState } from 'react';
import CommentBox from './commentBox.js'; // Ensure CommentBox is also a client component if it uses hooks

const CommentsList = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('/api/comments');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      }
    };

    fetchComments();
  }, []);

  return (
    <div>
      {comments.map((comment) => (
        <CommentBox
          key={comment.id}
          profilePicUrl="path/to/default/profilePic.png" // Assuming a default or you could include this in your comment model
          commentText={comment.content}
          isResolved={comment.resolved}
          topicTitle={comment.title}
        />
      ))}
    </div>
  );
};

export default CommentsList;
