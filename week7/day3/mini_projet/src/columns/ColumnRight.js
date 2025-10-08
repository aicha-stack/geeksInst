import React, { useState } from "react";
import { Button } from "react-bootstrap";

function ColumnRight() {
  const [text, setText] = useState('{"function":"I live to crash"}');

  const replaceWithObject = () => {
    setText({ function: "I live to crash" });
  };

  const invokeHandler = () => {
    throw new Error("Manual event error");
  };

  return (
    <div>
      <p>{text}</p>
      <Button variant="danger" onClick={replaceWithObject} className="m-2">
        Replace string with object
      </Button>
      <Button variant="warning" onClick={invokeHandler} className="m-2">
        Invoke event handler
      </Button>
    </div>
  );
}

export default ColumnRight;
