import React, { useState, useEffect, useRef } from "react";
import ColorBox from "../components/ColorBox";

function RandomColor(currentColor) {
  const COLOR_LIST = ["red", "yellow", "green"];
  const currentIndex = COLOR_LIST.indexOf(currentColor);
  let newIndex = currentIndex;

  while (currentIndex === newIndex) {
    newIndex = Math.trunc(Math.random() * 3);
  }

  console.log(COLOR_LIST[newIndex]);
  return COLOR_LIST[newIndex];
}

function useMagicColor() {
  const [color, setColor] = useState("transparent");
  let colorRef = useRef("transparent");

  useEffect(() => {
    const colorInterval = setInterval(() => {
      // console.log("first color: ", color);
      // console.log("change color: ", colorRef.current);
      const newColor = RandomColor(colorRef.current);

      setColor(newColor);

      colorRef.current = newColor;
    }, 1000);

    return () => {
      clearInterval(colorInterval);
    };
  }, []);

  return color;
}

export default useMagicColor;
