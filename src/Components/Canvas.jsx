import React, { useEffect, useState } from "react";
import "./Canvas.css";
function Canvas() {
  const [recPos, SetRecPos] = useState({});
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  let recClass = {
    position: "absolute",
    border: "2px solid green",
    width: "80px",
    height: "100px",
    left: recPos.left?.left + "px",
    top: recPos.top?.top + "px",
  };

  useEffect(() => {
    let rec = document.getElementById("rec2");

    rec.addEventListener("mousedown", mouseDrag);
    console.log(rec.offsetTop);
    function mouseDrag(e) {
      e.preventDefault();

      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDrag;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e.preventDefault();

      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      SetRecPos((prev) => ({
        left: {
          ...prev.left,
          left: rec.offsetLeft - pos1,
        },
        top: {
          ...prev.top,
          top: rec.offsetTop - pos2,
        },
      }));
    }

    function closeDrag() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }, []);

  console.log(recPos.left?.left, recPos.top?.top);
  return (
    <>
      <div className="canvas">
        <div className="rec"></div>
        <div style={recClass} id="rec2"></div>
      </div>
    </>
  );
}

export default Canvas;
