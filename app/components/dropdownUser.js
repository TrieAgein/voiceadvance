import React, { useState } from "react";
import Image from "next/image";
import arrowsSVG from "../public/arrows.svg";
import AddEmployee from "./addEmployee";
import AllEmployees from "./allEmployee";
import DeleteEmployee from "./deleteEmployee.js";
import "../css/page.css";

const DropdownUser = () => {
  const [toggled, setToggled] = useState(false);

  return (
    <div className={"dropdown" + (toggled ? " open" : "")}>
      <a
        onClick={() => {
          setToggled(!toggled);
        }}
        className="dr_title"
      >
        Users
        <Image src={arrowsSVG} />
      </a>
      <div className="content">
        <AddEmployee />
        <DeleteEmployee />
        <AllEmployees />
      </div>
    </div>
  );
};

export default DropdownUser;
