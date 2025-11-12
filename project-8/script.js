const input = document.getElementById("itemInput");
const addBtn = document.getElementById("addBtn");
const listContainer = document.getElementById("listContainer");

addBtn.addEventListener("click", () => {
  let item = input.value.trim();

  if (item !== "") {
    let newItem = document.createElement("li");
    newItem.textContent = item;
    console.log(newItem);
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    newItem.appendChild(deleteBtn);

    listContainer.appendChild(newItem);

    input.value = "";

    deleteBtn.addEventListener("click", () => {
      listContainer.removeChild(newItem);
    });
  } else {
    alert("Enter something");
  }
});


