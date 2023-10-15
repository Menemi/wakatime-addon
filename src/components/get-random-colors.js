import React from "react";

export default function GetRandomColors(number, backgroundVisibility = 0.2, borderVisibility = 1) {
  const listOfColors = [
    [255, 0, 0], [255, 211, 0], [0, 204, 0], [57, 20, 176],
    [255, 73, 0], [255, 232, 0], [0, 175, 100], [83, 15, 174],
    [255, 116, 0], [255, 255, 0], [0, 153, 153], [114, 9, 171],
    [255, 146, 0], [204, 246, 0], [11, 97, 164], [167, 0, 167],
    [255, 170, 0], [159, 238, 0], [18, 64, 171], [205, 0, 116],
    [255, 191, 0], [103, 227, 0], [27, 27, 179], [228, 0, 69],
  ];

  let backgroundColors = [];
  let borderColors = [];

  for (let i = 0; i < number; i++) {
    const index = Math.floor(Math.random() * 24);

    backgroundColors.push(`rgba(${listOfColors[index][0]}, ${listOfColors[index][1]}, ${listOfColors[index][2]}, ${backgroundVisibility})`)
    borderColors.push(`rgba(${listOfColors[index][0]}, ${listOfColors[index][1]}, ${listOfColors[index][2]}, ${borderVisibility})`)
  }

  return [backgroundColors, borderColors];
}