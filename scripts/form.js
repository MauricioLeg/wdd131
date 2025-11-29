const year = document.querySelector("#currentyear")
const today = new Date();
year.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;
document.getElementById("lastModified").innerHTML = `Last Modified:` + document.lastModified;

const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

function addProducts() {
    const list = document.getElementById('product')
    list.innerHTML = '<option disabled selected>Select a Product &#9662;</option>';
    products.forEach((product) => {
        let name = product.name;

        list.innerHTML += `<option value = "${name}">${name}</option>`
    });
}
addProducts();

let reviewCount = Number(localStorage.getItem('reviewCount')) || 0;
reviewCount++;
localStorage.setItem('reviewCount', reviewCount);
