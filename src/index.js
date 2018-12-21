(function(){
  var ENTER_KEY = 13;

  var App = {

    init: function() {
      this.$todosList = $('#todos-list');
      this.$todoInput = $('#todo-input');
      this.$clearButton = $('#clear-button');
      this.todos = store.get('todos') || [];
      this.$deleteIcon;
      this.displayTodosOnLoad();
      this.getInputValue();
      this.storageHasData();
      this.activateEventHandlers();
      this.activateClearButton();
    },


    // Activate all event handlers
    activateEventHandlers: function() {
      this.$todosList
      .on('dblclick', 'label', this.editTodo.bind(this))
      .on('focusout', '.todo-edit', this.focusOnInput.bind(this))
    },

    
    focusOnInput: function(event) {
      this.$todoInput.focus();
      $(event.currentTarget).closest('li').removeClass('editing'); // fix this
    },
    
  
    // Retrieve input value and add to storage
    getInputValue: function() {
      var that = this;
      
      // Check for any instance of a key press
      this.$todoInput.on('keypress', function(event) {
        var keyPressed = event.which || event.keyCode;
  
        // Check if "Enter" button is pressed
        if (keyPressed === ENTER_KEY) {
          // Get submitted value from input and create object
          var $input = $(event.target);
          var val = $input.val().trim();
          var todoItem = {
            task: val,
            completed: false
          };
          // Add new submitted todo to storage
          that.todos.push(todoItem);
          // Once new todo is added to array, update storage
          store.set('todos', that.todos);
          // Clear input field
          that.$todoInput.val('');
          // Make todo an HTML element
          todoHTML =
          '<li class="todo-item">' +
            '<div class="todo-view">' +
              '<label>' + todoItem.task + '</label>' +
              '<button class="delete-icon"><i class="fas fa-times fa-lg"></i></button>' +
            '</div>' +
            '<input class="todo-edit" value="' + todoItem.task + '">'+
          '</li>';
          // Append input value
          that.$todosList.append(todoHTML);
          that.$deleteIcon = $('.delete-icon');
          // Make "Clear All" button visible
          that.$clearButton.addClass('is-visible');
          that.activateDeleteButton();
        }
      });
    },


    // Clear all todo items on button click
    activateClearButton: function() {
      var that = this;

      this.$clearButton.on('click', function(event) {
        event.preventDefault();
        store.set('todos', []);
        that.$todosList.empty();
      })
    },

    
    // Retrieve index for selected todo item 
    getIndex: function(task) {
      for (var i = 0; i < this.todos.length; i++) {
        if (this.todos[i].task === task) {
          return i;
        }
      }
    },

    
    // Delete todo item on icon click
    activateDeleteButton: function() {
      var that = this;

      this.$deleteIcon.on('click', function(event) {
        event.preventDefault();
        // Get name of todo item
        var task = event.currentTarget.parentElement.textContent;
        // Get index for clicked item
        var index = that.getIndex(task);
        // Remove item from list based on index
        if (index > -1) {
          that.todos.splice(index, 1);
        }
        // Update local storage
        store.set('todos', that.todos);
        // Display todos
        that.displayTodos(that.todos);
      })
    },


    // Check that storage has at least one todo item
    storageHasData: function() {
      return this.todos.length > 0;
    },


    // Display all todos with data provided
    displayTodos: function(todoList) { 
      this.$todosList.empty();     
      // Display each todo item in storage on screen
      var todos = todoList.map(function(todo) {
        return '<li class="todo-item">' +
          '<div class="todo-view">' +
            '<label>' + todo.task + '</label>' +
            '<button class="delete-icon"><i class="fas fa-times fa-lg"></i></button>' +
          '</div>' +
          '<input class="todo-edit" value="' + todo.task + '">'+
        '</li>';
      });
      this.$todosList.append(todos);
      this.$deleteIcon = $('.delete-icon');
      this.activateDeleteButton();
    },

    
    // Automatically display all todos on page load
    displayTodosOnLoad: function() {
      // Check if todos storage had any todo items
      if (this.storageHasData() === true) {
        this.displayTodos(this.todos);
      }
    },


    // Edit todo item
    editTodo: function(event) {
        $(event.currentTarget).closest('li').addClass('editing');
        $('.todo-edit').focus();
    }
  };

  App.init();
})();
