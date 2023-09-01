import React, { useEffect, useState } from "react";
import "./Canvas.css";

function dragBox(e, rec, setPositions, id) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  e.preventDefault();

  pos3 = e.clientX;
  pos4 = e.clientY;
  document.onmouseup = closeDrag;
  document.onmousemove = elementDrag;

  function elementDrag(e) {
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    let leftPos = rec.offsetLeft - pos1;
    let topPos = rec.offsetTop - pos2;
    if (leftPos > 0 && leftPos < 300 && topPos > 0 && topPos < 300) {
      setPositions((prev) => {
        const pos = {
          ...prev,
          [id]: {
            left: leftPos,
            top: topPos,
          },
        };
        return pos;
      });
    }
  }

  function closeDrag() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function getBoxStyles(box, positions) {
  const styles = {
    position: "absolute",
    height: box.height,
    width: box.width,
    backgroundColor: box.backgroundColor,
    left: (positions[box.id]?.left || 0) + "px",
    top: (positions[box.id]?.top || 0) + "px",
  };

  return styles;
}

function Canvas({ boxes }) {
  const [positions, setPositions] = useState({});
  useEffect(() => {
    boxes?.forEach((box) => {
      const rec = document.getElementById(`box-${box.id}`);

      rec.addEventListener("mousedown", (e) => {
        dragBox(e, rec, setPositions, box.id);
      });
    });
  }, [boxes, positions]);

  return (
    <>
      <div className="canvas" id="canvas">
        {boxes?.map((box) => {
          return (
            <div
              id={`box-${box.id}`}
              key={box.id}
              style={getBoxStyles(box, positions)}
            />
          );
        })}
      </div>
    </>
  );
}

export default Canvas;
