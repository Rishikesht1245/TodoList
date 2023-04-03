const form = document.getElementById('form');
const input = document.getElementById('input');
const todoList = document.getElementById('todos');

// localStorage.clear();

// retrieving older todos if any :
const todos = JSON.parse(localStorage.getItem('todos'));

// Updating local storage:
const updateLocalStorage = () => {
      const todosElements = document.querySelectorAll('li');
      const todos = [];
      todosElements.forEach((todoElement) => {
            todos.push({
                  text: todoElement.innerText,
                  completed : todoElement.classList.contains('completed')
            });
      });
      localStorage.setItem('todos',JSON.stringify(todos));
};
        

// Adding todo 

const addTodo = (todo) => {
      let todoText = input.value;
      if(todo){
            todoText = todo.text;
      }

      if(todoText){
            const todoElement = document.createElement('li');
            if(todo && todo.completed){
                  todoElement.classList.add('completed');
            }

            todoElement.innerText =todoText;
                  todoElement.addEventListener('click', () =>{
                  todoElement.classList.toggle('completed');
                  updateLocalStorage();
            });

            todoElement.addEventListener('contextmenu', (e) =>{
                  e.preventDefault();
                  todoElement.remove();
                  updateLocalStorage();
            });

            
            todoList.appendChild(todoElement);
            input.value = " ";
            updateLocalStorage();
      }
};

if (todos) {
      todos.forEach((todo) => addTodo(todo));
}

form.addEventListener('submit', (e) => {
      e.preventDefault();
      addTodo();
});
