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

let currentIndex = 0;
const cards = document.querySelectorAll('.recipe-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showCard(index) {
    cards.forEach((card, i) => {
        card.classList.remove('active');
        if (i === index) {
            card.classList.add('active');
        }
    });
}

if (prevBtn && nextBtn)
{
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        showCard(currentIndex);
    });
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        showCard(currentIndex);
    });
}

// --------------------- SEND RECIPE FUNCTIONALITY ---------------------
const variableList = document.querySelector("#list");
const variableInput = document.querySelector("#item");
const variableButton = document.querySelector('#add-ingredient-btn');

if (variableButton && variableInput && variableList)
{    
    let chaptersArray = getChapterList() || [];
    chaptersArray.forEach(chapter => {
    displayList(chapter);
    });

    variableButton.addEventListener("click", (event) => {
        event.preventDefault();
        
        if (variableInput.value.trim() !== "")
        {
            displayList(variableInput.value);
            chaptersArray.push(variableInput.value);
            setChapterList(chaptersArray);
            variableInput.value = '';
            variableInput.focus();
        }
    });
    function displayList(item) {
        const listItem = document.createElement("li");
        const deleteBtn = document.createElement("button");

        listItem.textContent = item;
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add('delete')
        listItem.appendChild(deleteBtn);
        variableList.appendChild(listItem);

        deleteBtn.addEventListener("click", () => {
            variableList.removeChild(listItem);
            deleteChapter(listItem.textContent)
            variableInput.focus();
            }
    )};

    function setChapterList(list) {
        localStorage.setItem('myRecipe', JSON.stringify(chaptersArray));
    }
    function deleteChapter(chapter) {
        chapter = chapter.slice(0, chapter.length - 1);
        chaptersArray = chaptersArray.filter(item => item !== chapter)
        setChapterList();
    }
}

function getChapterList() {
    return JSON.parse(localStorage.getItem('myRecipe'))
}