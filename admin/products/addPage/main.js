let checkbox = document.querySelector(".checkbox");
let otherOptions = document.querySelector(".otherOptions");
let prewieColor = document.querySelector(".prewieColor");

let colors = [
  { name: "red", rgb: "#ff1100" },
  { name: "blue", rgb: "#1100ff" },
  { name: "green", rgb: "#00ff44" },
  { name: "lightBlue", rgb: "#A0BCE0" },
  { name: "yellow", rgb: "#FFB71A" },
  { name: "grey", rgb: "#41434D" },
  { name: "purple", rgb: "#d900ff" },
  { name: "purple", rgb: "#d900ff" },
  { name: "purple", rgb: "#d900ff" },
  { name: "purple", rgb: "#d900ff" },

];

let userColor = [];

colors.forEach((color) => {
  let colorBox = document.createElement("div");
  colorBox.classList.add("colorsC");
  colorBox.style.backgroundColor = color.rgb;

  colorBox.onclick = () => {
    if (userColor.includes(color.rgb)) {
      userColor = userColor.filter((c) => c !== color.rgb);
      colorBox.classList.remove("selected");
    } else {
      userColor.push(color.rgb);
      colorBox.classList.add("selected");
    }
    console.log(userColor);
  };

  prewieColor.append(colorBox);
});

checkbox.onclick = () => {
  otherOptions.style.display = checkbox.checked ? "block" : "none";
};

