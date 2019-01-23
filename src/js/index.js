import '../scss/style.scss'; // Import scss file for webpack to compile
var $ = require("jquery");
var store =  require("store2");
import { Sortable } from '@shopify/draggable';

(function(){
  var ENTER_KEY = 13;
  var ESCAPE_KEY = 27;

  var App = {

    init: function() {
      this.$appContainer = $('#app-container');
      this.$todosList = $('#todos-list');
      this.$todoInput = $('#todo-input');
      this.$clearInputButton = $('#clear-input-button');
      this.$clearButton = $('#clear-button');
      this.$clearCompletedButton = $('#clear-completed-button');
      this.$hideShowButton = $('#hide-show-completed-button');
      this.$completedTodosContainer = $('#completed-todos');
      this.todos = store.get('todos') || [];
      this.completedTodos = store.get('completed-todos') || [];
      this.$draggableIcon
      this.$deleteIcon;
      this.escPressed;
      this.sortableList = new Sortable(document.querySelectorAll('#todos-list'), {
        draggable: 'li',
        handle: '.draggable-icon'
      });
      this.displayTodosOnLoad();
      this.getInputValue();
      this.activateEventHandlers();
      this.activateClearButton();
      this.activateClearCompletedButton();
      // this.disableNewTodoInput();
    },


    // Activate all event handlers
    activateEventHandlers: function() {
      this.$todoInput.on('keyup', this.toggleClearInputButton.bind(this));
      this.$clearInputButton.on('click', this.clearInputValue.bind(this));
      this.$todosList
      .on('dblclick', 'label', this.focusOnTodoForEditing.bind(this))
      .on('keyup', 'input.todo-edit', this.updateOnEnter.bind(this))
      .on('blur', 'input.todo-edit', this.updateAndClose.bind(this))
      .on('click', 'input.checkbox', this.toggleCheckbox.bind(this));
      this.$hideShowButton.on('click', this.toggleHideShowButton.bind(this));
      this.$completedTodosContainer.on('click', 'input', this.toggleCompletedTodos.bind(this));
    },


    // Toggle clear input button
    toggleClearInputButton: function() {
      if (this.$todoInput.val()) {
        this.$clearInputButton.addClass('is-visible');
      } else {
        this.$clearInputButton.removeClass('is-visible');
      }
    },


    // Clear input value
    clearInputValue: function() {
      this.$todoInput.val('');
      this.$todoInput.focus();
      this.$clearInputButton.removeClass('is-visible');
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
          that.displayTodos(that.todos);
          // Make "Clear All" button visible
          that.$clearButton.addClass('is-visible');
          that.activateDeleteButton();
          // that.disableNewTodoInput();
        }
      });
    },


    // Focus on todo item for editing
    focusOnTodoForEditing: function(event) {
      $(event.currentTarget).closest('li').addClass('editing');
      $('.todo-edit').focus();
    },    


    // Update todo item on keypress
    updateOnEnter: function(event) {
      var keyPressed = event.which || event.keyCode;

      if (keyPressed === ESCAPE_KEY) {
        this.escPressed = true;
        if (this.todos.length < 3) {
          this.$todoInput.focus(); // this will trigger updateAndClose()
        } else {
          $(event.target).blur();
        }
      }
      if (keyPressed === ENTER_KEY) {
        if (this.todos.length < 3) {
          this.$todoInput.focus(); // this will trigger updateAndClose()
        } else {
          $(event.target).blur();
        }
      }
    },


    // Update todo and exit edit mode
    updateAndClose: function(event) {
      var defaultValue = event.target.defaultValue;
      var newValue = event.target.value.trim();
      var index = this.getIndex(defaultValue, this.todos);

      // If escape button is pressed, don't update todo
      if (this.escPressed === true) {
        this.displayTodos(this.todos);
      }
      // If edited todo is empty string, remove todo
      else if (newValue === '') {
        this.$todoInput.focus();
        this.todos.splice(index, 1);
        store.set('todos', this.todos);
        this.displayTodos(this.todos);
      }
      // Otherwise, update todo
      else {
        // this.$todosInput.focus() placed before displayTodos to prevent
        // trigger of blur event which will rerun this entire function
        this.$todoInput.focus();
        this.todos[index].task = newValue;
        store.set('todos', this.todos);
        this.displayTodos(this.todos);
      }

      // Exit edit mode
      $(event.currentTarget).closest('li').removeClass('editing');
      
      // Set to false to allow update for future blur events
      this.escPressed = false;
    },


    // Clear all todo items on button click
    activateClearButton: function() {
      this.$clearButton.on('click', function(event) {
        event.preventDefault();
        // Set this.todos to empty array to erase all data.
        // store.set('todos', []) will not erase this.todos
        // but instead display duplicate list on screen when
        // a new todo is created after pressing clear all button
        this.todos = [];
        store.set('todos', this.todos);

        this.displayTodos();
        this.toggleClearButton();
        // this.disableNewTodoInput();
        this.$todoInput.focus();
      }.bind(this));
    },

    
    // Clear all todo items on button click
    activateClearCompletedButton: function() {
      this.$clearCompletedButton.on('click', function(event) {
        event.preventDefault();
        // Set this.completedTodos to empty array to erase all data.
        // store.set('todos', []) will not erase this.todos
        // but instead display duplicate list on screen when
        // a new todo is created after pressing clear all button
        this.completedTodos = [];
        store.set('completed-todos', this.completedTodos);

        this.displayCompletedTodos();
        this.toggleClearButton();
        this.$todoInput.focus();
      }.bind(this));
    },

    
    // Retrieve index for selected todo item 
    getIndex: function(task, arrayList) {
      for (var i = 0; i < arrayList.length; i++) {
        if (arrayList[i].task === task) {
          return i;
        }
      }
    },


    // Toggle hide/show button for completed todos
    toggleHideShowButton: function() {
      this.$completedTodosContainer.slideToggle();
    },


    // Toggle Clear All Button
    toggleClearButton: function() {
      var todosLength = this.todos.length;
      var completedTodosLength = this.completedTodos.length;

      if (todosLength > 0) {
        this.$clearButton.addClass('is-visible');
      } else if (todosLength === 0) {
        this.$clearButton.removeClass('is-visible');
      }

      if (completedTodosLength > 0) {
        this.$clearCompletedButton.addClass('is-visible');
        this.$hideShowButton.addClass('is-visible');
      } else {
        this.$clearCompletedButton.removeClass('is-visible');
        this.$hideShowButton.removeClass('is-visible');
      }
    },

    
    // Delete todo item on icon click
    activateDeleteButton: function() {
      this.$deleteIcon.on('click', function(event) {
        event.preventDefault();
        // Get name of todo item
        var task = event.currentTarget.parentElement.textContent;
        // Get index for clicked item
        var index = this.getIndex(task, this.todos);
    
        // Remove item from list based on index
        if (index > -1) {
          this.todos.splice(index, 1);
        }
        // Update local storage
        store.set('todos', this.todos);
        // Display todos
        this.displayTodos(this.todos);
        // this.disableNewTodoInput();
        this.toggleClearButton();
      }.bind(this));
    },


    // Toggle checkbox
    toggleCheckbox: function(event) {
      event.preventDefault();
      var isChecked = $(event.currentTarget).prop('checked');
      var todoValue = $(event.currentTarget).siblings('label').text();
      var index = this.getIndex(todoValue, this.todos);
      var todo = this.todos[index];
      
      this.todos[index].completed = isChecked

      // If item is checked, remove item from todos list and add to completed todos list
      if (isChecked === true) {
        this.todos.splice(index, 1);
        this.completedTodos.push(todo);
      }

      store.set('todos', this.todos);
      store.set('completed-todos', this.completedTodos);
      this.displayTodos(this.todos);
      this.displayCompletedTodos(this.completedTodos);
    },


    // Add completed todo item back to todo list if checkbox gets unchecked
    toggleCompletedTodos: function(event) {
      event.preventDefault();
      var isChecked = $(event.currentTarget).prop('checked');
      var completedTodoValue = $(event.currentTarget).siblings('label').text();
      var index = this.getIndex(completedTodoValue, this.completedTodos);
      var completedTodo = this.completedTodos[index];
      
      this.completedTodos[index].completed = isChecked

      // If item is checked, remove item from todos list and add to completed todos list
      if (isChecked === false) {
        this.completedTodos.splice(index, 1);
        this.todos.push(completedTodo);
      }

      store.set('todos', this.todos);
      store.set('completed-todos', this.completedTodos);
      this.displayTodos(this.todos);
      this.displayCompletedTodos(this.completedTodos);
    },


    // Add todo item to completed todos list
    displayCompletedTodos: function(completedTodos) {
      if (this.completedTodos.length === 0) {
        this.$completedTodosContainer.empty();
        return;
      };

      var completedTodosHTML = completedTodos.map(function(todo) {
        var isChecked;
        var completed;

        if (todo.completed === true) {
          isChecked = 'checked';
          completed = 'completed';
        } else {
          isChecked = '';
          completed = '';
        }

        return '<li class="todo-item-completed">' +
            '<input class="checkbox" type="checkbox"' + isChecked + '>' +
            '<label class="' + completed + '">' + todo.task + '</label>' +
          '</li>';
      });

      this.$completedTodosContainer.empty();
      this.$completedTodosContainer.append(completedTodosHTML);
    },


    // Display all todos with data provided
    displayTodos: function(todos) { 
      if (this.todos.length === 0) {
        this.$todosList.empty();
        return;
      };

      // Display each todo item in storage on screen
      var todos = todos.map(function(todo) {
        var isChecked;
        var completed;

        if (todo.completed === true) {
          isChecked = 'checked';
          completed = 'completed';
        } else {
          isChecked = '';
          completed = '';
        }

        return '<li class="todo-item">' +
          '<div class="todo-view">' +
            '<input class="checkbox" type="checkbox"' + isChecked + '>' +
            '<label class="' + completed + '">' + todo.task + '</label>' +
            '<div class="todo-item-icon-container">' +
              '<span class="icon draggable-icon"><i class="fas fa-bars"></i></span>' +
              '<button class="icon delete-icon"><i class="fas fa-trash-alt"></i></button>' +
            '</div>' +
          '</div>' +
          '<input class="todo-edit" value="' + todo.task + '">' +
        '</li>';
      });
      
      this.$todosList.empty();
      this.$todosList.append(todos);
      
      this.toggleClearButton();
      this.$draggableIcon = $('.draggable-icon');
      this.$deleteIcon = $('.delete-icon');
      this.$clearButton = $('#clear-button');
      this.activateDeleteButton();
      this.activateSortableList();
    },


    // Allow list item order to be sortable
    activateSortableList: function() {
      this.sortableList.on('sortable:stop', function(sortableEvent) {
        var oldIndex = sortableEvent.oldIndex;
        var newIndex = sortableEvent.newIndex;
        var sortedItem = this.todos[oldIndex];

        if (newIndex !== oldIndex) {
          this.todos.splice(oldIndex, 1);
          this.todos.splice(newIndex, 0, sortedItem);
          store.set('todos', this.todos);
        }
      }.bind(this));
    },


    // Disable new todo input if todos length equals 3
    disableNewTodoInput: function() {
      var todosLength = this.todos.length;

      if (todosLength === 3) {
        this.$todoInput.prop('disabled', true);
        this.$todoInput.addClass('disabled');
      } else {
        this.$todoInput.prop('disabled', false);
        this.$todoInput.removeClass('disabled');
        this.$todoInput.focus();
      }
    },

    
    // Automatically display all todos on page load
    displayTodosOnLoad: function() {
      var todosLength = this.todos.length;
      var completedTodosLength = this.completedTodos.length;

      // Check if todos storage had any todo items
      if (todosLength > 0) {
        this.displayTodos(this.todos);
      }

      // Check if completed todos storage had any todo items
      if (completedTodosLength > 0) {
        this.displayCompletedTodos(this.completedTodos);
      }
    },
  };

  App.init();
})();
