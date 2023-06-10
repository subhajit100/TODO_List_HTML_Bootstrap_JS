const updateTableBodyWithNotes = (itemJsonArray) => {
  let tableBody = document.getElementById("tableBody");
  let str = "";
  itemJsonArray.forEach((element, index) => {
    str += `<tr>
                <th scope="row">${index + 1}</th>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td><button class="btn btn-danger" onclick="deleteNote(${index})">Delete</button></td>
            </tr>`;
  });

  tableBody.innerHTML = str;
};

// updating the table on first time reload of page
if(localStorage.getItem("itemsJson")){
    updateTableBodyWithNotes(JSON.parse(localStorage.getItem("itemsJson")));
}


// handle the click on (Add item) button, by adding elements to localstorage
document.getElementById("add-item").addEventListener("click", () => {
  // updating the localStorage of browser to store the list of todo items
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let itemJsonArray;
  if (!localStorage.getItem("itemsJson")) {
    itemJsonArray = [];
    itemJsonArray.push([title, description]);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  } else {
    var itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.push([title, description]);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  }

  // Populating the todo list table with localStorage on a click
  updateTableBodyWithNotes(itemJsonArray);
});

// deleting items from localStorae to reflect in notes table.
const deleteNote = (itemIndex) => {
  let itemJsonArrayStr = localStorage.getItem("itemsJson");
  let itemJsonArray = JSON.parse(itemJsonArrayStr);
  itemJsonArray.splice(itemIndex, 1);
  localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  updateTableBodyWithNotes(itemJsonArray);
};

// clearning the whole notes list from localStorage and the table, making it empty
document.getElementById("remove-item").addEventListener('click', ()=>{
    // giving user a prompt to check if they really want to clear the whole list
    if(confirm("Do you really want to clear the whole list?")){
        localStorage.removeItem("itemsJson");
        let itemJsonArray = [];
        updateTableBodyWithNotes(itemJsonArray);
    }
});
