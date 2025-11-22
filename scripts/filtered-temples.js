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

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Buenos Aires Argentina",
    location: "Buenos Aires, Argentina",
    dedicated: "1986, January, 17",
    area: 30659,
    imageUrl:
	"https://churchofjesuschristtemples.org/assets/img/temples/buenos-aires-argentina-temple/buenos-aires-argentina-temple-4087-main.jpg"
  },
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 382207,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg"
  },
  {
	templeName: "Salta Argentina",
	location: "Salta, Argentina",
	dedicated: "2024, June, 16",
	area: 27000,
	imageUrl:
	"https://churchofjesuschristtemples.org/assets/img/temples/salta-argentina-temple/salta-argentina-temple-48241-main.jpg"
  },
];

createTempleCard(temples);

const homeLink = document.querySelector("#home-link");
const oldLink = document.querySelector("#old-link");
const newLink = document.querySelector("#new-link");
const largeLink = document.querySelector("#large-link");
const smallLink = document.querySelector("#small-link");

homeLink.addEventListener("click", () => {
	createTempleCard(temples);
	const newTitle = document.getElementById("title");
	newTitle.textContent = 'Home'
})
oldLink.addEventListener("click", () => {
	createTempleCard(temples.filter(temple => {
		const year = parseInt(temple.dedicated.split(',')[0]);
		return year < 1900;
	}))
	const newTitle = document.getElementById("title");
	newTitle.textContent = 'Old Temples';
})
newLink.addEventListener("click", () => {
	createTempleCard(temples.filter(temple => {
		const year = parseInt(temple.dedicated.split(',')[0]);
		return year > 2000;
	}))
	const newTitle = document.getElementById("title");
	newTitle.textContent = 'New Temples';
})
largeLink.addEventListener("click", () => {
	createTempleCard(temples.filter(temple => temple.area > 90000))
	const newTitle = document.getElementById("title");
	newTitle.textContent = 'Large Temples';
})
smallLink.addEventListener("click", () => {
	createTempleCard(temples.filter(temple => temple.area < 10000))
	const newTitle = document.getElementById("title");
	newTitle.textContent = 'Small Temples';
})

function createTempleCard(filteredTemples) {
	document.querySelector(".res-grid").innerHTML = "";	
	filteredTemples.forEach(temple => {
		let card = document.createElement("section");
		let name = document.createElement("h2");
		let location = document.createElement("p");
		let dedication = document.createElement("p");
		let area = document.createElement("p");
		let img = document.createElement("img");

		name.textContent = temple.templeName;
		location.innerHTML = `<span class="label">Location</span><span>: ${temple.location}</span>`;
		dedication.innerHTML = `<span class="label">Dedicated</span><span>: ${temple.dedicated}</span>`;
		area.innerHTML = `<span class="label">Size</span><span>: ${temple.area} sq ft</span>`;
		img.setAttribute("src", temple.imageUrl);
		img.setAttribute("alt", `${temple.templeName} Temple`);
		img.setAttribute("loading", "lazy");
		img.setAttribute("width", 400)
		img.setAttribute("height", 600)

		card.appendChild(name);
		card.appendChild(location);
		card.appendChild(dedication);
		card.appendChild(area);
		card.appendChild(img);

		document.querySelector(".res-grid").appendChild(card);
	})
};