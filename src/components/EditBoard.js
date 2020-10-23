import React, { useState, useRef } from "react";
import TextareaAutosize from "react-textarea-autosize";

const EditBoard = ({ title }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="cursor-pointer" onClick={() => setIsEditing(true)}>
      {isEditing ? <TextareaAutosize value={title} /> : <h1>{title}</h1>}
    </div>
  );
};

export default EditBoard;
