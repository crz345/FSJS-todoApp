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
  
    let filteredTodos = [];
	  for (let i = 0; i < todos.length; i++) {
		  const todo = todos[i];
		  if (filter === "all") {
			  filteredTodos.push(todo);
		  } else if (filter === "completed" && todo.completed) {
			  filteredTodos.push(todo);
		  } else if (filter === "active" && !todo.completed) {
			  filteredTodos.push(todo);
		  }
    }

    // Loop through the filtered todos and add them to the DOM
    //by creating new div element for each todo
    for (let i = 0; i < filteredTodos.length; i++) {
      const todo = filteredTodos[i];
  
      const todoItemDiv = document.createElement("div");
      todoItemDiv.classList.add("p-4", "todo-item");
      
      const todoTextDiv = document.createElement("div");
      todoTextDiv.id = `todo-text-${todo.id}`;
      todoTextDiv.classList.add("todo-text");
      if (todo.completed) {
        todoTextDiv.classList.add("line-through");
      }
      todoTextDiv.textContent = todo.text;
      
      const todoEditInput = document.createElement("input");
      todoEditInput.classList.add("hidden","todo-edit");
      todoEditInput.setAttribute("value",todo);
      
      todoItemDiv.appendChild(todoTextDiv);
      todoItemDiv.appendChild(todoEditInput);
      toDoListSection.appendChild(todoItemDiv);
    }
  }

  function handleNewTodoKeyDown(event) {
    const newTodoInput = event.target; //extracting input element from event object
    const todoText = newTodoInput.value.trim(); //retrieving value of input field and removing whitespace
    if (event.key === 'Enter' && todoText !== '') {
      todos.push({ id: nextTodoId++, text: todoText, completed: false});
      newTodoInput.value = ''; //clearing the input field
      renderTodos(); //need to update displayed todos for new addition
    }
  }

  //function to handle marking a todo as completed
function handleClickOnNavbar(event) {
	//checking if the clicked element is an anchor tag (<a>)
	//function will only run if user clicks on a filter link
	if (event.target.tagName === "A") {
		//extracting href attribute of clicked anchor element to get URL
		const hrefValue = event.target.href;
		//split URL by "/" element, extract last part using pop()
		//this last part corresponds to filter action (all, active, completed)
		const action = hrefValue.split("/").pop();
		//filter is set to all if action is empty string, otherwise filter = action
		filter = action === "" ? "all" : action;
		renderTodos(); //rerendering page to reflect selected filter
    renderTodoNavBar(hrefValue);
	}
}

//function to update the navbar anchor elements dynamically
function renderTodoNavBar(href) {
	const elements = todoNav.children;
	//iterates over child elements of navbar
	for (let i = 0; i < elements.length; i++) {
		const element = elements[i];
		//applies or removes underline style based on href value
		//if anchor element matches current href, underline applied
		if (element.href === href) {
			element.classList.add(
				"underline",
        "underline-offset-4",
        "decoration-rose-800",
        "decoration-2",
       );
     } else {
	     element.classList.remove(
		    "underline",
        "underline-offset-4",
        "decoration-rose-800",
        "decoration-2",
	    );
	    }
	 }
}

//function to toggle completed status of todo when clicked
function handleClickOnTodoList(event) {
	//to identify clicked todo 
	let todo = null;
	//ensures that following code only runs if text of todo item was clicked, and not any other part of todo or page
	if (event.target.id !== null && event.target.id.includes("todo-text")) {
		todo = event.target;
	}
	
	//extracting todo ID from ID attribute of element
	let todoIdNumber = -1;
	if (todo) {
		const todoId = event.target.id.split("-").pop();
		todoIdNumber = Number(todoId); //must convert string to number
	}
	
	//loop through todos array to find todo that matches clicked id
	for (let i = 0; i < todos.length; i++) {
		if (todos[i].id === todoIdNumber) {
			//toggle todo status
			todos[i].completed = !todos[i].completed;
		}
	}
	renderTodos(); //must rerender UI
}

// Event listener to initialize the app after the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', renderTodos);

const newTodoInput = document.getElementById('new-todo');
newTodoInput.addEventListener('keydown',handleNewTodoKeyDown);
const todoNav = document.getElementById("todo-nav");
todoNav.addEventListener("click", handleClickOnNavbar);
const todoListElement = document.getElementById("todo-list");
todoListElement.addEventListener("click",handleClickOnTodoList);