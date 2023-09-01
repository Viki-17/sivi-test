import React, { useEffect, useState } from "react";
import Buttons from "./Buttons";
import Canvas from "./Canvas";
import "./Body.css";
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

function randomBoxGenerator(box, setBox) {
  const widthDimensions = Math.floor(Math.random() * 200 + 100);
  const heigthDimensions = Math.floor(Math.random() * 200 + 100);
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const boxObj = {
    id: box.length + 1,
    width: `${widthDimensions}px`,
    height: `${heigthDimensions}px`,
    backgroundColor: `#${randomColor}`,
  };
  setBox((prev) => [...prev, boxObj]);
}

const storeJSON = {};

function printJSON() {
  const can = document.getElementById("canvas")?.childNodes;

  can?.forEach((item) => {
    storeJSON[item.id] = {
      position: item.style.position,
      width: item.style.width,
      height: item.style.height,
      left: item.style.left,
      top: item.style.top,
    };
  });
  console.log(storeJSON);
}
function Body() {
  const [box, setBox] = useState([]);
  const [storeJSON, setStoreJSON] = useState({});

  return (
    <>
      <div className="body_container">
        <div className="body_buttons">
          <button onClick={() => randomBoxGenerator(box, setBox)}>
            Add Shape
          </button>
          <button onClick={() => printJSON()}>Print Json</button>
        </div>
        <Canvas boxes={box} />
      </div>
    </>
  );
}

export default Body;
