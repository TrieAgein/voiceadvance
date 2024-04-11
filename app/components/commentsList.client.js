import React, { useEffect, useState } from 'react';
import CommentBox from './commentBox.js'; // Ensure CommentBox is also a client component if it uses hooks

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
        setComments(data); // Directly set the array of comments
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
          key={comment.comment_id}
          profilePicUrl="path/to/default/profilePic.png" // Placeholder
          commentText={comment.content}
          isResolved={comment.resolved}
          topicTitle={comment.topic}
          name={comment.name}
          upvotes={comment.upvotes}
          createdAt={comment.createdAt}
          // Pass any other props as needed
        />
      ))}
    </div>
  );
};

export default CommentsList;
