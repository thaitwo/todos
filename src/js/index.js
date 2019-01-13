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
      this.$clearButton = $('#clear-button');
      this.todos = store.get('todos') || [];
      this.$deleteIcon;
      this.escPressed;
      this.sortableList = new Sortable(document.querySelectorAll('#todos-list'), {
        draggable: 'li'
      });
      this.displayTodosOnLoad();
      this.getInputValue();
      this.storageHasData();
      this.activateEventHandlers();
      this.activateClearButton();
      // this.disableNewTodoInput();
    },


    // Activate all event handlers
    activateEventHandlers: function() {
      this.$todosList
      .on('dblclick', 'label', this.focusOnTodoForEditing.bind(this))
      .on('keyup', 'input.todo-edit', this.updateOnEnter.bind(this))
      .on('blur', 'input.todo-edit', this.updateAndClose.bind(this))
      .on('click', 'input[type="checkbox"]', this.toggleCheckbox.bind(this))
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


    // Toggle checkbox
    toggleCheckbox: function(event) {
      var isChecked = $(event.currentTarget).prop('checked');
      var todoValue = $(event.currentTarget).siblings('label').text();
      var index = this.getIndex(todoValue);
      
      this.todos[index].completed = isChecked
      store.set('todos', this.todos);
      this.displayTodos(this.todos);
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
      var index = this.getIndex(defaultValue);

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

        this.$todosList.empty();
        this.toggleClearButton();
        // this.disableNewTodoInput();
        this.$todoInput.focus();
      }.bind(this));
    },

    
    // Retrieve index for selected todo item 
    getIndex: function(task) {
      for (var i = 0; i < this.todos.length; i++) {
        if (this.todos[i].task === task) {
          return i;
        }
      }
    },


    // Toggle Clear All Button
    toggleClearButton: function() {
      var todosLength = this.todos.length;

      if (todosLength > 0) {
        this.$clearButton.addClass('is-visible');
      } else if (todosLength === 0) {
        this.$clearButton.removeClass('is-visible');
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
        // that.disableNewTodoInput();
        that.toggleClearButton();
      })
    },


    // Check that storage has at least one todo item
    storageHasData: function() {
      return this.todos.length > 0;
    },


    // Display all todos with data provided
    displayTodos: function(todos) { 
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
            '<input type="checkbox"' + isChecked + '>' +
            '<label class="' + completed + '">' + todo.task + '</label>' +
            '<button class="delete-icon"><i class="fas fa-trash-alt fa-lg"></i></button>' +
          '</div>' +
          '<input class="todo-edit" value="' + todo.task + '">'+
        '</li>';
      });
      this.$todosList.empty();
      this.$todosList.append(todos);
      
      this.toggleClearButton();
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
      // Check if todos storage had any todo items
      if (this.storageHasData() === true) {
        this.displayTodos(this.todos);
      }
    },
  };

  App.init();
})();
