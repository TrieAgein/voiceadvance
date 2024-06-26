import React, { useEffect, useState } from "react";
import CommentBox from "./commentBoxResolver.js"; // Ensure this component can recursively display replies

const CommentsList = ({ search, filter }) => {
  const [comments, setComments] = useState([]);
  const fetchComments = async () => {
    try {
      const response = await fetch("/api/comments");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setComments(data); // Assume data is structured with replies nested within each comment
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    }
  };

  useEffect(() => {
    if (filter === undefined) {
      fetchComments();
    }
  }, []);

  useEffect(() => {
    if (search !== undefined) {
      const searchComments = async () => {
        try {
          const response = await fetch(`/api/search?search=${search}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          setComments(data);
        } catch (error) {
          console.error("Failed to fetch comments:", error);
        }
      };
      if (search === "") fetchComments();
      else searchComments();
    }
  }, [search]);

  const handleReplySubmitted = (newReply) => {
    // Simple approach: Add the reply to the top-level state and re-fetch or update locally
    setComments((prev) => [...prev, newReply]); // Simplified: you'll need to find the correct comment to append this reply
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
        upvotedBy={comment.upvotedBy}
        createdAt={comment.createdAt}
        replies={renderComments(comment.replies || [])}
        onReplySubmitted={handleReplySubmitted}
      />
    ));
  };

  return renderComments(comments);
};

export default CommentsList;
