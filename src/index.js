(function(){
  var ENTER_KEY = 13;
  var todosStorage = [];
  var count = 1;

  var App = {
    
    // On submission, add todo to list
    // Store todo list
    // Append each new todo item on screen
    // Always fetch todos from store and display on screen
    // When user clicks on delete icon, remove todo from list


    init: function() {
      this.$todosContainer = $('#todos-container');
      this.$todoInput = $('#todo-input');
      this.displayTodos();
      this.getInputValue();
    },
  
    getInputValue: function() {
      var that = this;
      
      this.$todoInput.on('keypress', function(event) {
        var keyPressed = event.which || event.keyCode;
  
        // If "Enter" button is pressed...
        if (keyPressed === ENTER_KEY) {
          // Get submitted value from input
          var todo = this.value;
          todosStorage.push(todo);
          store.set('todos', todosStorage);
          console.log(todosStorage);
          todo = '<div class="todo-item"><p>' + todo + '<span class="delete-icon"><i class="fas fa-times fa-lg"></i></span></p></div>';
          
          // Clear input field
          that.$todoInput.val('');
  
          // Append input value
          that.$todosContainer.append(todo);
          
          count++;
        }
      })
    },



    displayTodos: function() {
      var that = this;
      var todos = store.get('todos') || [];

      if (todos.length > 0) {        
        todos.forEach(function(todo) {
          that.$todosContainer.append(todo);
        });
      }
    }
  };

  App.init();
})();
