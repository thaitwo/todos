var todosContainer = document.getElementById('todos-container');
var todoInput = document.getElementById('todo-input');

function getInputValue() {
    var key = event.which || event.keyCode;

    // If "Enter" button is pressed...
    if (key === 13) {
      var value = event.target.value;
      var todo = '<div>' + value + '</div>';
      
      // Clear input field
      todoInput.value = '';

      // Append input value
      var todoHTML = document.createElement('p');
      todoHTML.innerHTML = todo;
      todosContainer.appendChild(todoHTML);
    }
};