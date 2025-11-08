const year = document.querySelector("#currentyear")
const today = new Date();
year.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

document.getElementById("lastModified").innerHTML = document.lastModified;

const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navbar");

hamButton.addEventListener("click", () => {
	navigation.classList.toggle("open");
	hamButton.classList.toggle("open");
});
