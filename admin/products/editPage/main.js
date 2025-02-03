import { fileTobase64 } from "../../../config.js";
import { getData } from "../../../requests/request.js";
import { putData } from "../../../requests/request.js";
let ProductInfo = JSON.parse(localStorage.getItem("product"));
console.log(ProductInfo);

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
let option1 = document.querySelector(".o1");
let option2 = document.querySelector(".o2");
let value1 = document.querySelector(".v1");
let value2 = document.querySelector(".v2");

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

let images = ProductInfo.images ? [...ProductInfo.images] : [];
let fileInput = document.querySelector("#fileInput");
let filelist = document.querySelector(".filelist");

fileInput.onchange = async () => {
  let files = Array.from(fileInput.files);
  files.forEach(async (file) => {
    let base64 = await fileTobase64(file);
    addImageToList(base64, file.name);
  });
  console.log("Final images array:", images);
};

function addImageToList(base64, name) {
  let item = document.createElement("tr");
  item.innerHTML = `
    <td>
      <img class="item-img" src="${base64}" alt="preview">
    </td>
    <td>
      <span>${name}</span>
    </td>
    <td>
      <span class="delete-btn">🗑️</span>
    </td>
  `;
  let deleteBut = item.querySelector(".delete-btn");
  deleteBut.onclick = () => {
    images = images.filter((img) => img !== base64);
    item.remove();
    console.log("Updated images array:", images);
  };
  images.push(base64);
  filelist.append(item);
};

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

  // edit
  mainForm["productNameInp"].value = ProductInfo.productName;
  mainForm["description"].value = ProductInfo.description;
  mainForm["categories"].value = ProductInfo.category;
  mainForm["brands"].value = ProductInfo.brand;
  mainForm["productPrice"].value = ProductInfo.price.cost;
  mainForm["discount"].value = ProductInfo.price.discount;
  mainForm["count"].value = ProductInfo.price.count;
  option1.value = Object.keys(ProductInfo.options)[0];
  option2.value = Object.keys(ProductInfo.options)[1];
  value1.value = Object.values(ProductInfo.options)[0];
  value2.value = Object.values(ProductInfo.options)[1];

  ProductInfo.color.forEach((productColor) => {
    let existingColor = colors.find((c) => c.rgb === productColor.rgb);
    if (!existingColor) {
      colors.push(productColor);
    }
  });
  getColor(colors);

  function renderImages() {
    filelist.innerHTML = ""; // Очищаем перед рендерингом

    images.forEach((img, index) => {
      let imageSrc = typeof img === "string" ? img : img.src; // Проверяем, это строка base64 или объект
      let item = document.createElement("tr");
      item.innerHTML = `
        <td>
          <img class="item-img" src="${imageSrc}" alt="preview">
        </td>
        <td>${img.name || `Image ${index + 1}`}</td>
        <td>
          <span class="delete-btn">🗑️</span>
        </td>
      `;
      let deleteBut = item.querySelector(".delete-btn");
      deleteBut.onclick = () => {
        images.splice(index, 1); // Удаляем изображение из массива
        renderImages(); // Перерисовываем список
      };

      filelist.append(item);
    });
  }
  renderImages();

  mainForm.onsubmit = async (e) => {
    e.preventDefault();
    let price = {
      cost: Number(mainForm["productPrice"].value),
      discount: mainForm["discount"].value ? mainForm["discount"].value : null,
      count: mainForm["count"].value,
    };
    let updateProduct = {
      ...ProductInfo,
      productName: mainForm["productNameInp"].value,
      description: mainForm["description"].value,
      category: mainForm["categories"].value,
      brand: mainForm["brands"].value,
      price: price,
      options: {},
      color: userColor,
      images: images,
    };
    window.location = "../index.html"
    await putProduct(updateProduct);
    alert("sucsessFully editing product");
    console.log(updateProduct);
  };
}

// post-product
async function putProduct(updateProduct) {
  try {
    updateProduct.images = images.map((img) => ({
      src: img.src || img,
      name: img.name || "",
    }));
    await putData(`/products/${updateProduct.id}`, updateProduct);
  } catch (error) {
    console.error(error);
  }
}

getCategory();
