import React, { useEffect, useState } from "react";
import "./Canvas.css";

const BOXES = [
  {
    id: 1,
    width: "110px",
    height: "105px",
    backgroundColor: "yellow",
  },
  {
    id: 2,
    width: "100px",
    height: "150px",
    backgroundColor: "blue",
  },
];

function dragBox(e, rec, setPositions, id) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  //   mouseDrag(e);
  //   function mouseDrag(e) {
  e.preventDefault();

  pos3 = e.clientX;
  pos4 = e.clientY;
  document.onmouseup = closeDrag;
  document.onmousemove = elementDrag;
  //   }

  function elementDrag(e) {
    e.preventDefault();

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    setPositions((prev) => {
      const pos = {
        ...prev,
        [id]: {
          left: rec.offsetLeft - pos1,
          top: rec.offsetTop - pos2,
        },
      };
      return pos;
    });
  }

  function closeDrag() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function Canvas({ boxes = BOXES }) {
  const [positions, setPositions] = useState({});

  useEffect(() => {
    boxes.forEach((box) => {
      const rec = document.getElementById(`box-${box.id}`);

      rec.addEventListener("mousedown", (e) => {
        dragBox(e, rec, setPositions, box.id);
      });
    });
  }, []);

  return (
    <>
      <div className="canvas">
        {/* <div className="rec"></div> */}
        {boxes.map((box) => {
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
function getBoxStyles(box, positions) {
  const styles = {
    position: "absolute",
    height: box.height,
    width: box.width,
    backgroundColor: box.backgroundColor,
    left: (positions[box.id]?.left || 0) + "px",
    top: (positions[box.id]?.top || 0) + "px",
  };
  console.log({ styles });

  return styles;
}

export default Canvas;
