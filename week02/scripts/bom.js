const variableList = document.querySelector("ul");
const variableInput = document.querySelector("input");
const variableButton = document.querySelector("button");

variableButton.addEventListener("click", (event) => {
    event.preventDefault();
    
    if (variableInput.value.trim() !== "")
    {
        const userInput = variableInput.value;
        variableInput.value = "";

        const listItem = document.createElement("li");
        const listText = document.createElement("span");
        const deleteBtn = document.createElement("button");

        listText.textContent = userInput;
        listItem.appendChild(listText);
        deleteBtn.textContent = "❌";
        listItem.appendChild(deleteBtn);
        variableList.appendChild(listItem);

        deleteBtn.addEventListener("click", () =>
        {
        variableList.removeChild(listItem)
        });
    }
    variableInput.focus();
});