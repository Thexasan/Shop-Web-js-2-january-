let tbody = document.querySelector(".tbody");

export function get(products) {
  tbody.innerHTML = "";
  products.forEach((product) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
        <td class="checkbox">
                    <input type="checkbox" name="" id="">
                </td>
              <td class="productTd">
                <div class="product">
                    <img src="${product.images[0].src}" alt="" />
                    <p class="productName">${product.productName}</p>
                </div>
              </td>
              <td class="invertory">
                in stock
              </td>
              <td class="CategoryTd">${product.category}</td>
              <td class="priceTd">$${product.price.cost}</td>
              <td class="actionsTd">
                <div class="actionsDiv">
                  <i class="bi bi-pencil-fill" id="editBut"></i>
                  <i class="bi bi-trash-fill" id="deleteBut"></i>
                </div>
              </td>
        `;
        tbody.append(tr)
  });
}
