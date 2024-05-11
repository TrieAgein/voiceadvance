import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import close from "/images/icons/close.svg";
import DeptDropdown from "./deptDropdown";
import PriorityDropdown from "./priorityDropdown";
import CategoryDropdown from "./categoryDropdown";
import "../css/page.css";

const EditComment = ({ commentId, userId, isOpen, togglePopup }) => {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState("");
  const [department, setDepartment] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [authorId, setAuthorId] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const setDepartmentState = useCallback((val) => {
    setDepartment(val);
  }, []);

  const setPriorityState = useCallback((val) => {
    setPriority(val);
  }, []);

  const setCategoryState = useCallback((val) => {
    setCategory(val);
  }, []);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await fetch(`/api/comments/${commentId}`);
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.message || "Failed to fetch comment");

        setTopic(data.topic);
        setContent(data.content);
        setDepartment(data.department);
        setPriority(data.priority);
        setCategory(data.category);
        setAuthorId(data.authorId);

        // Ensure both IDs are treated as strings or numbers before comparison
        const authorIdStr = String(data.authorId);
        const userIdStr = String(userId);
        setIsAuthorized(authorIdStr === userIdStr);

        // Log values for debugging
        console.log(
          "Author ID:",
          authorIdStr,
          "User ID:",
          userIdStr,
          "Authorized:",
          authorIdStr === userIdStr,
        );
      } catch (error) {
        console.error("Error fetching comment:", error);
      }
    };

    fetchComment();
  }, [commentId, userId]);

  const handleSubmit = async () => {
    if (!isAuthorized) {
      console.error("Unauthorized attempt to edit comment");
      return;
    }

    const payload = {
      topic,
      content,
      department,
      priority,
      category,
    };

    try {
      const response = await fetch(`/api/edit-comment/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error updating comment");
      }

      console.log("Comment updated successfully:", result);
      togglePopup(); // Close the popup after successful update
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  return (
    <>
      {isOpen && (
        <div id="popup-wrapper">
          <div className="popup">
            <div className="close-button" onClick={togglePopup}>
              <Image src={close} alt="Close" />
            </div>
            <div id="popup-body">
              <h1>Edit Comment</h1>
              <h2 className="asterisk">Comment Title</h2>
              <input
                style={{ width: "100%", padding: "5px", border: "solid black" }}
                type="text"
                placeholder="Enter Title here..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
              <div className='category-container'>
                <div className='item'>
                  <h3>Select your Department</h3>
                  <DeptDropdown department={department} departmentSetter={setDepartmentState}/>
                </div>
                <div className='item'>
                  <h3>Select Priority Level</h3>
                  <PriorityDropdown priority={priority} prioritySetter={setPriorityState}/>
                </div>
                <div className='item'>
                  <h3>Category</h3>
                  <CategoryDropdown category={category} categorySetter={setCategoryState}/>
                </div>
              </div>
              <br />
              <textarea
                style={{
                  width: "100%",
                  height: "200px",
                  padding: "5px",
                  resize: "none",
                  border: "solid black",
                }}
                placeholder="Your comment here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              {isAuthorized ? (
                <div className="close-button">
                  <a className="submit-comment" onClick={handleSubmit}>
                    Save Comment
                  </a>
                </div>
              ) : (
                <div style={{ color: "red" }}>
                  You are not authorized to edit this comment.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditComment;
