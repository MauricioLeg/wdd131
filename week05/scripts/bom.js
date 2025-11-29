const variableList = document.querySelector("ul");
const variableInput = document.querySelector("input");
const variableButton = document.querySelector("button");

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
        setChapterList();
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

function setChapterList() {
    localStorage.setItem('myFavBOMList', JSON.stringify(chaptersArray));
}

function getChapterList() {
    return JSON.parse(localStorage.getItem('myFavBOMList'))
}

function deleteChapter(chapter) {
    chapter = chapter.slice(0, chapter.length -1);
    chaptersArray = chaptersArray.filter(item => item !== chapter)
    setChapterList();
}