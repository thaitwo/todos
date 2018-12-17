(function(){
  var ENTER_KEY = 13;
  var storage = store.get('todos') || [];

  var App = {
    
    // When user clicks on delete icon, remove todo from list


    init: function() {
      this.$todosContainer = $('#todos-container');
      this.$todoInput = $('#todo-input');
      this.$clearButton = $('#clear-button');
      this.$deleteIcon;
      this.displayTodosOnLoad();
      this.getInputValue();
      this.storageHasData();
      this.activateClearButton();
      this.activateDeleteIcon();
    },
  
    // Retrieve input value and add to storage
    getInputValue: function() {
      var that = this;
      
      // Check for any instance of a key press
      this.$todoInput.on('keypress', function(event) {
        var keyPressed = event.which || event.keyCode;
  
        // Check if "Enter" button is pressed
        if (keyPressed === ENTER_KEY) {
          // Get submitted value from input
          var todoItem = this.value;
          // Add new submitted todo to storage
          var todoList = store.get('todos') || [];
          todoList.push(todoItem);
          // Once new todo is added to array, add that array back to storage
          store.set('todos', todoList);
          // Clear input field
          that.$todoInput.val('');
          // Make todo an HTML element
          todoHTML = '<div class="todo-item"><p>' + todoItem + '</p><span class="delete-icon"><i class="fas fa-times fa-lg"></i></span></div>';
          // Append input value
          that.$todosContainer.append(todoHTML);
          that.$deleteIcon = $('.delete-icon');
          // Make "Clear All" button visible
          that.$clearButton.addClass('is-visible');
        }
      })
    },


    activateClearButton: function() {
      var that = this;

      this.$clearButton.on('click', function(event) {
        event.preventDefault();

        store.set('todos', []);
        that.$todosContainer.empty();
      })
    },


    activateDeleteIcon: function() {
      var that = this;

      this.$deleteIcon.on('click', function(event) {
        event.preventDefault();
        console.log('event', event);
        // Get name of todo item
        var todo = event.currentTarget.parentElement.textContent;
        // Get todos array for store
        var todoList = store.get('todos');
        var index = todoList.indexOf(todo);

        if (index > -1) {
          todoList.splice(index, 1);
        }

        store.set('todos', todoList);
        todoList = store.get('todos');
        
        that.displayTodos(todoList);
      })
    },


    storageHasData: function() {
      return storage.length > 0;
    },


    displayTodos: function(todoList) { 
      this.$todosContainer.empty();     
      // Display each todo item in storage on screen
      var todos = todoList.map(function(todo) {
        return '<div class="todo-item"><p>' + todo + '</p><span class="delete-icon"><i class="fas fa-times fa-lg"></i></span></div>';
      });
      this.$todosContainer.append(todos);
      this.$deleteIcon = $('.delete-icon');
    },

    
    displayTodosOnLoad: function() {
      // Check if todos storage had any todo items
      if (this.storageHasData() === true) {
        this.displayTodos(storage);
      }
    }
  };

  App.init();
})();
