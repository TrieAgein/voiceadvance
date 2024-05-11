import React, { useState } from "react";
import "../css/commentBox.css"; // Using the same styling, you may choose to customize this further for replies
import EditComment from "./editComment";
import { useSession } from "next-auth/react";

const ReplyBox = ({
  name,
  commentId,
  commentText,
  upvotes,
  createdAt,
  isAnonymous,
}) => {
  const { data: session } = useSession();
  const [currentUpvotes, setCurrentUpvotes] = useState(upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  if (isEditing) {
    return (
      <EditComment
        commentId={commentId}
        userId={session?.user?.id}
        isOpen={isEditing}
        togglePopup={toggleEditing}
      />
    );
  }

  const handleUpvote = async () => {
    const newUpvoteStatus = !hasUpvoted;
    // Determine the new count based on whether the user is upvoting or removing their upvote
    const updatedUpvotes = newUpvoteStatus
      ? currentUpvotes + 1
      : currentUpvotes - 1;

    try {
      const response = await fetch(`/api/upvotes/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ upvotes: updatedUpvotes }),
      });

      if (!response.ok) {
        throw new Error("Failed to update upvotes");
      }

      // Update the state only after confirming the server response was OK
      setCurrentUpvotes(updatedUpvotes);
      setHasUpvoted(newUpvoteStatus);
    } catch (error) {
      console.error("Error upvoting comment:", error);
    }
  };

  return (
    <div className="comment-box reply-box">
      <div className="comment-header">
        <div>
          <a className="comment-meta">
            {name} •{" "}
            {new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </a>
        </div>
        <a
          style={{ padding: "none", marginLeft: "auto" }}
          onClick={handleUpvote}
          className={`upvote-button ${hasUpvoted ? "upvoted" : ""}`}
        >
          +{currentUpvotes}
        </a>
      </div>
      <p className="comment-text" onClick={toggleEditing}>
        {commentText}
      </p>
    </div>
  );
};

export default ReplyBox;
