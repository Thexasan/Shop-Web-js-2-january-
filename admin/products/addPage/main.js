import { fileTobase64 } from "../../../config.js";
import { getData } from "../../../requests/request.js";
import { postData } from "../../../requests/request.js";
let checkbox = document.querySelector(".checkbox");
let otherOptions = document.querySelector(".otherOptions");
let prewieColor = document.querySelector(".prewieColor");
let mainForm = document.querySelector(".mainForm");
let addNewColorBut = document.querySelector(".addNewColor");
let colorModal = document.querySelector(".colorModal");
let selectColor = document.querySelector(".selectColor");
let hexCode = document.querySelector(".hexCode");
let exitButModal = document.querySelector(".exitButModal");
let cancel = document.querySelector(".cancel");
let mainDiv = document.querySelector(".mainDiv");

async function getCategory() {
  let category = await getData(`/category`);
  let brands = await getData(`/brands`);
  formData(category, brands);
}

let colors = [
  { name: "red", rgb: "#ff1100" },
  { name: "blue", rgb: "#1100ff" },
  { name: "green", rgb: "#00ff44" },
  { name: "lightBlue", rgb: "#A0BCE0" },
  { name: "yellow", rgb: "#FFB71A" },
  { name: "grey", rgb: "#41434D" },
  { name: "purple", rgb: "#d900ff" },
];
let colorObj = null;
let userColor = [];
function getColor(colors) {
  prewieColor.innerHTML = "";
  colors.forEach((color) => {
    let colorBox = document.createElement("div");
    colorBox.classList.add("colorsC");
    colorBox.style.backgroundColor = color.rgb;
    colorBox.onclick = () => {
      let existingColor = userColor.find((c) => c.name == color.name);
      if (existingColor) {
        userColor = userColor.filter((c) => c.name !== color.name);
        colorBox.classList.remove("selected");
      } else {
        userColor.push({
          name: color.name,
          rgb: color.rgb,
        });
        colorBox.classList.add("selected");
      }
      console.log(userColor);
    };
    prewieColor.append(colorBox);
  });
}
getColor(colors);
let colorValue = null;
selectColor.oninput = () => {
  colorValue = selectColor.value;
  // console.log(colorValue);
  hexCode.innerHTML = colorValue;
};
checkbox.onclick = () => {
  otherOptions.style.display = checkbox.checked ? "block" : "none";
};
addNewColorBut.onclick = () => {
  colorModal.showModal();
  exitButModal.onclick = () => colorModal.close();
  cancel.onclick = () => colorModal.close();
  mainDiv.onsubmit = (e) => {
    e.preventDefault();
    let newColor = {
      name: mainDiv["colorNameInp"].value,
      rgb: colorValue,
    };
    console.log(newColor);
    colors.push(newColor);
    colorModal.close();
    console.log(colors);
    getColor(colors);
  };
};

let images = [];
let fileInput = document.querySelector("#fileInput");
let filelist = document.querySelector(".filelist");
fileInput.onchange = async () => {
  let files = Array.from(fileInput.files);
  console.log(files);

  imagesGet(files);
};
function imagesGet(files) {
  filelist.innerHTML = "";
  files.forEach(async (file) => {
    let base64 = await fileTobase64(file);

    let item = document.createElement("tr");
    item.innerHTML = `
        <td><img class="item-img" src="${base64}" alt="preview"></td>
        <td><span>${file.name}</span></td>
        <td><span class="delete-btn">🗑️</span></td>
        `;
    images.push({ src: base64, name: file.name });

    let btnDel = item.querySelector(".delete-btn");
    filelist.append(item);
    btnDel.onclick = () => {
      // images = images.filter((e) => e.src !== base64);
    };
  });
}

let option1 = document.querySelector(".o1")
let option2 = document.querySelector(".o2")
let value1 = document.querySelector(".v1")
let value2 = document.querySelector(".v2")
let brands = document.querySelector(".brands");
let categories = document.querySelector(".categories");
function formData(category, brand) {
  category.forEach((elem) => {
    let option = document.createElement("option");
    option.value = elem.name;
    option.innerHTML = elem.name;
    categories.append(option);
  });
  brand.forEach((el) => {
    let option = document.createElement("option");
    option.value = el.brandName;
    option.innerHTML = el.brandName;
    brands.append(option);
  });
  mainForm.onsubmit = async (e) => {
    e.preventDefault();
    let price = {
      cost: Number(mainForm["productPrice"].value),
      discount: mainForm["discount"].value ? mainForm["discount"].value : null,
      count: mainForm["count"].value,
    };
    let newProduct = {
      productName: mainForm["productNameInp"].value,
      description: mainForm["description"].value,
      category: mainForm["categories"].value,
      brand: mainForm["brands"].value,
      price: price,
      options: {
        [option1.value] : value1.value,
      },
      color: userColor,
      images: images,
    };
    await postProduct(newProduct);
    alert("sucsessFully added product");
    console.log(newProduct);
  };
}
//post-product
async function postProduct(newProduct) {
  try {
    await postData("/products", newProduct);
  } catch (error) {
    console.error(error);
  }
}
//     "id": "1",
//     "productName": "Sofa Set",
//     "description": "Lorem ipsum dolor sit amet, consect",
//     "category": "Man’s Fashion",
//     "brand": "Puma",
//     "price": {
//       "cost": 200.99,
//       "discount": 20,
//       "count": 10
//     },
//     "options": {},
//     "color": [
//       {
//         "name": "black",
//         "rgb": "#00000"
//       }
//     ],
//     "images": [
//       {
//         "id": 1,
//         "src": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/800px-BMW.svg.png"
//       },
//       {
//         "id": 2,
//         "src": "base64"
//       },
//       {
//         "id": 3,
//         "src": "base64"
//       }
//     ]
//   },
getCategory();
