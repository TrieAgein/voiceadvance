import React, { useState, useEffect } from "react";
import Image from "next/image";
import arrowsSVG from "../public/arrows.svg";
import "../css/page.css";

const categoryDropdown = ({ categorySetter }) => {
  const [toggled, setToggled] = useState(false);
  const [category, setCategory] = useState("None");
  const [otherCategory, setOtherCategory] = useState("");

  useEffect(() => {
    categorySetter(category);
  }, [categorySetter, category]);

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    if (value === "Other") {
      // When "Other" is selected, use the otherCategory state for the category
      setCategory(otherCategory || "Other"); // Use existing otherCategory or default to 'Other'
    } else {
      setCategory(value);
    }
  };

  const handleOtherCategoryChange = (event) => {
    setOtherCategory(event.target.value);
    // Also update the category directly if Other is already selected
    if (category === "Other" || category === otherCategory) {
      setCategory(event.target.value);
    }
  };

  return (
    <div className="dropcategory-open">
      <div className={"dropcategory" + (toggled ? " open" : "")}>
        <a
          onClick={() => {
            setToggled(!toggled);
          }}
          className="category-title"
        >
          Please Select a Category...
          <div className={"tie-img" + (toggled ? " " : " ")}>
            <div className="img">
              <Image src={arrowsSVG} />
            </div>
          </div>
        </a>
        <div>
          {toggled && (
            <>
              <label className="check-container">
                <input
                  type="radio"
                  name="radio-button3"
                  value="Leadership"
                  className="checkmark"
                  onChange={handleCategoryChange}
                />{" "}
                <p className="category-text">Leadership</p>
              </label>

              <label className="check-container">
                <input
                  type="radio"
                  name="radio-button3"
                  value="Career Advancement"
                  className="checkmark"
                  onChange={handleCategoryChange}
                />{" "}
                <p className="category-text">Career Advancement</p>
              </label>

              <label className="check-container">
                <input
                  type="radio"
                  name="radio-button3"
                  value="Improvement Ideas"
                  className="checkmark"
                  onChange={handleCategoryChange}
                />{" "}
                <p className="category-text">Improvement Ideas</p>
              </label>

              <label className="check-container">
                <input
                  type="radio"
                  name="radio-button3"
                  value="Work Scheduling"
                  className="checkmark"
                  onChange={handleCategoryChange}
                />{" "}
                <p className="category-text">Work Scheduling</p>
              </label>
              <label className="check-container">
                <input
                  type="radio"
                  name="radio-button3"
                  value="Other"
                  className="checkmark"
                  onChange={handleCategoryChange}
                />
                <p className="category-text">Other</p>
              </label>

              {(category === "Other" || category === otherCategory) && (
                <input
                  type="text"
                  placeholder="Please specify"
                  value={otherCategory}
                  onChange={handleOtherCategoryChange}
                  className="other-category-input"
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default categoryDropdown;
