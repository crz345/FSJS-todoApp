import "../style.css";

// Define the state of our app
const todos = [
    { id: 1, text: "Buy coffee", completed: false },
    { id: 2, text: "Buy sugar", completed: false },
    { id: 3, text: "Buy jam", completed: true },
  ];
  let nextTodoId = 4;
  let filter = "all"; // can be 'all', 'active', or 'completed'

  // Function to render the todos
function renderTodos() {
    const toDoListSection = document.getElementById("todo-list");
    toDoListSection.innerHTML = ""; // clear the current list
    //ensures that we start with clean slate each time we render todos
  
    // Loop through the filtered todos and add them to the DOM
    //by creating new div element for each todo
    for (let i = 0; i < todos.length; i++) {
      const todo = todos[i];
  
      const todoItemDiv = document.createElement("div");
      todoItemDiv.classList.add("p-4", "todo-item");
      
      const todoTextDiv = document.createElement("div");
      todoTextDiv.classList.add("todo-text");
      todoTextDiv.textContent = todo.text;
      
      const todoEditInput = document.createElement("input");
      todoEditInput.classList.add("hidden","todo-edit");
      todoEditInput.setAttribute("value",todo);
      
      todoItemDiv.appendChild(todoTextDiv);
      todoItemDiv.appendChild(todoEditInput);
      toDoListSection.appendChild(todoItemDiv);
    }
  }

// Event listener to initialize the app after the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', renderTodos);