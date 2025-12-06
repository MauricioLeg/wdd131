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

// --------------------- RECIPES FUNCTIONALITY ---------------------
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
    let recipesArray = getRecipesList() || [];

    variableButton.addEventListener("click", (event) => {
        event.preventDefault();
        
        if (variableInput.value.trim() !== "")
        {
            displayList(variableInput.value);
            recipesArray.push(variableInput.value);
            setRecipeList(recipesArray);
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
            deleteRecipe(listItem.textContent)
            variableInput.focus();
        });
    }
}
function deleteRecipe(recipe) {
    recipe = recipe.slice(0, recipe.length -1);
    let recipesArray = getRecipesList() || [];
    recipesArray = recipesArray.filter(item => item !== recipe);
    setRecipeList(recipesArray);
}
function setRecipeList(list) {
    localStorage.setItem('myRecipe', JSON.stringify(list));
}
function getRecipesList() {
    return JSON.parse(localStorage.getItem('myRecipe'));
}


// --------------------- FORM SUBMISSION ---------------------
const recipeForm = document.querySelector('form')
if (recipeForm) {
    recipeForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const recipeName = document.querySelector('#recipe-title')?.value || 'Untitled';
        const ingredients = getRecipesList() || [];
        const instructions = document.querySelector('#instruction')?.value || '';
        const recipeImg = document.querySelector('#recipe-image');

        if (recipeImg && recipeImg.files && recipeImg.files[0]) {
            const file = recipeImg.files[0];
            const maxSize = 2 * 1024* 1024;
            const fileSize = (file.size / 1024 / 1024).toFixed(2);
                
            if (file.size > maxSize) {
                alert(`The file is ${fileSize}MB. Please choose an image smaller than 2mb.`)
                return;
                }
                    
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const ImageData = e.target.result;

                const newRecipe = {
                    name: recipeName,
                    ingredients: ingredients,
                    instructions: instructions,
                    image: ImageData,
                    dateAdded: new Date().toISOString()
                };

                let userRecipes = JSON.parse(localStorage.getItem('userRecipes')) || [];
                userRecipes.push(newRecipe);
                localStorage.setItem('userRecipes', JSON.stringify(userRecipes));
                localStorage.removeItem('myRecipe');

                window.location.href = 'my-recipe.html';
            };
            reader.readAsDataURL(file);
        } 
        else {
            const newRecipe = {
                name: recipeName,
                ingredients: ingredients,
                instructions: instructions,
                image: null,
                dateAdded: new Date().toISOString()
            };

            let userRecipes = JSON.parse(localStorage.getItem('userRecipes')) || [];
            userRecipes.push(newRecipe);
            localStorage.setItem('userRecipes', JSON.stringify(userRecipes));
            localStorage.removeItem('myRecipe');

            window.location.href = 'my-recipe.html'
        }
    });
    const recipeImg = document.querySelector('#recipe-image');
    if (recipeImg) {
        recipeImg.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const maxSize = 2 * 1024* 1024;
                const fileSize = (file.size / 1024 / 1024).toFixed(2);
                
                if (file.size > maxSize) {
                    alert(`The file is ${fileSize}MB. Please choose an image smaller than 2mb.`)
                    recipeImg.value = '';
                }
            }
        });
    }
}

// --------------------- MY RECIPE FUNCTIONALITY ---------------------
function displayUserRecipes() {
    const userRecipes = JSON.parse(localStorage.getItem('userRecipes')) || [];
    const container = document.querySelector('#user-recipes-container');

    if (!container) return;
    if (userRecipes.length === 0) {
        container.innerHTML ='<p id="the-recipe">No recipes yet. Add your first recipe <a href="https://mauricioleg.github.io/wdd131/project/send-recipe.html">here</a>!</p>';
        return;
    }
    
    container.innerHTML = '';
    userRecipes.forEach((recipe, index) => {
        const card = document.createElement('div');
        card.className = index === 0 ? 'recipe-card active' : 'recipe-card';

        const imageSent = recipe.image ? `<img src="${recipe.image}" alt="${recipe.name}" loading="lazy">` : '';

        card.innerHTML = `
            <h2>${recipe.name}</h2>
            ${imageSent}
            <h3>Ingredients</h3>
            <ul>
                ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
            <h3>Instructions</h3>
            <p>${recipe.instructions}</p>
        `;

        container.appendChild(card);
    });
    initializeUserCarousel();
}

function initializeUserCarousel() {
    const userPrevBtn = document.querySelector('#userPrevBtn');
    const userNextBtn = document.querySelector('#userNextBtn');
    const cards = document.querySelectorAll('#user-recipes-container .recipe-card');
    let currentIndex = 0;

    if (!userPrevBtn || !userNextBtn || cards.length === 0) return;

    function showUserCard(index) {
        cards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
    }

    userPrevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        showUserCard(currentIndex);
    });

    userNextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        showUserCard(currentIndex);
    });
}

if (document.querySelector('#user-recipes-container')) {
    displayUserRecipes();
}
