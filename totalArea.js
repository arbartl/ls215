function totalArea(array) {
  let areas = array.map(([height, width]) => height * width);
  return areas.reduce((total, area) => total + area);
}

let rectangles = [[3, 4], [6, 6], [1, 8], [9, 9], [2, 2]];

console.log(totalArea(rectangles));    // 141

function totalSquareArea(array) {
  let squares = array.filter(([height, width]) => height === width);
  return totalArea(squares);
}

let rectangles2 = [[3, 4], [6, 6], [1, 8], [9, 9], [2, 2]];

console.log(totalSquareArea(rectangles2));    // 121