(function(){
  var ENTER_KEY = 13;
  var storage = store.get('todos') || [];

  var App = {
    
    // On submission, add todo to list
    // Store todo list
    // Append each new todo item on screen
    // Always fetch todos from store and display on screen
    // When user clicks on delete icon, remove todo from list


    init: function() {
      this.$todosContainer = $('#todos-container');
      this.$todoInput = $('#todo-input');
      this.clearButton = document.getElementById('clear-button');
      this.displayTodosOnLoad();
      this.getInputValue();
      this.storageHasData();
      this.activateClearButton();
    },
  

    getInputValue: function() {
      var that = this;
      
      // Check for any instance of a key press
      this.$todoInput.on('keypress', function(event) {
        var keyPressed = event.which || event.keyCode;
  
        // Check if "Enter" button is pressed
        if (keyPressed === ENTER_KEY) {
          // Get submitted value from input
          var todo = this.value;
          // Add new submitted todo to storage
          storage.push(todo);
          // Once new todo is added to array, add that array back to storage
          store.set('todos', storage);
          // Clear input field
          that.$todoInput.val('');
          // Make todo an HTML element
          todoHTML = '<div class="todo-item"><p>' + todo + '<span class="delete-icon"><i class="fas fa-times fa-lg"></i></span></p></div>';
          // Append input value
          that.$todosContainer.append(todoHTML);
          // Make "Clear All" button visible
          that.clearButton.classList.add('is-visible');
        }
      })
    },

    activateClearButton: function() {
      var that = this;

      this.clearButton.addEventListener('click', function(event) {
        event.preventDefault();

        store.set('todos', []);
        that.$todosContainer.empty();
      })
    },


    storageHasData: function() {
      return storage.length > 0;
    },


    displayTodos: function(data) {
      var that = this;

      // Display each todo item in storage on screen
      data.forEach(function(todo) {
        var todoHTML = '<div class="todo-item"><p>' + todo + '<span class="delete-icon"><i class="fas fa-times fa-lg"></i></span></p></div>';
        that.$todosContainer.append(todoHTML);
      })
    },

    
    displayTodosOnLoad: function() {
      var that = this;

      // Check if todos storage had any todo items
      if (this.storageHasData() === true) {
        this.displayTodos(storage);
      }
    }
  };

  App.init();
})();
