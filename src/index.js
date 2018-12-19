(function(){
  var ENTER_KEY = 13;
  var storage = store.get('todos') || [];

  var App = {

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
          var $input = $(event.target);
          var todoItem = $input.val().trim();
          // Add new submitted todo to storage
          var todoList = store.get('todos') || [];
          todoList.push(todoItem);
          // Once new todo is added to array, add that array back to storage
          store.set('todos', todoList);
          // Clear input field
          that.$todoInput.val('');
          // Make todo an HTML element
          todoHTML = '<li class="todo-item"><label>' + todoItem + '</label><span class="delete-icon"><i class="fas fa-times fa-lg"></i></span></li>';
          // Append input value
          that.$todosContainer.append(todoHTML);
          that.$deleteIcon = $('.delete-icon');
          // Make "Clear All" button visible
          that.$clearButton.addClass('is-visible');
          that.activateDeleteIcon();
        }
      });
    },


    // Clear all todo items on button click
    activateClearButton: function() {
      var that = this;

      this.$clearButton.on('click', function(event) {
        event.preventDefault();

        store.set('todos', []);
        that.$todosContainer.empty();
      })
    },

    
    // Delete todo item on icon click
    activateDeleteIcon: function() {
      var that = this;

      this.$deleteIcon.on('click', function(event) {
        event.preventDefault();
        // Get name of todo item
        var todo = event.currentTarget.parentElement.textContent;
        console.log(todo, ' has been removed.');
        // Get todos array for store
        var todoList = store.get('todos');
        var index = todoList.indexOf(todo);

        if (index > -1) {
          todoList.splice(index, 1);
        }

        store.set('todos', todoList);
        
        that.displayTodos(todoList);
      })
    },



    // Check that storage has at least one todo item
    storageHasData: function() {
      return storage.length > 0;
    },


    // Display all todos with data provided
    displayTodos: function(todoList) { 
      this.$todosContainer.empty();     
      // Display each todo item in storage on screen
      var todos = todoList.map(function(todo) {
        return '<li class="todo-item"><label>' + todo + '</label><span class="delete-icon"><i class="fas fa-times fa-lg"></i></span></li>';
      });
      this.$todosContainer.append(todos);
      this.$deleteIcon = $('.delete-icon');
      this.activateDeleteIcon();
    },

    
    // Automatically display all todos on page load
    displayTodosOnLoad: function() {
      // Check if todos storage had any todo items
      if (this.storageHasData() === true) {
        this.displayTodos(storage);
      }
    }
  };

  App.init();
})();
