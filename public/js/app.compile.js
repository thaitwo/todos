/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/style.scss */ \"./scss/style.scss\");\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scss_style_scss__WEBPACK_IMPORTED_MODULE_0__);\n// Import scss file for webpack to compile\n\n\n(function(){\n  var ENTER_KEY = 13;\n  var ESCAPE_KEY = 27;\n\n  var App = {\n\n    init: function() {\n      this.$todosList = $('#todos-list');\n      this.$todoInput = $('#todo-input');\n      this.$clearButton = $('#clear-button');\n      this.todos = store.get('todos') || [];\n      this.$deleteIcon;\n      this.escPressed;\n      this.displayTodosOnLoad();\n      this.getInputValue();\n      this.storageHasData();\n      this.activateEventHandlers();\n      this.activateClearButton();\n    },\n\n\n    // Activate all event handlers\n    activateEventHandlers: function() {\n      this.$todosList\n      .on('dblclick', 'label', this.focusOnTodoForEditing.bind(this))\n      .on('keyup', 'input.todo-edit', this.updateOnEnter.bind(this))\n      .on('blur', 'input.todo-edit', this.updateAndClose.bind(this))\n      .on('click', 'input[type=\"checkbox\"]', this.toggleCheckbox.bind(this))\n    },\n\n\n    // Retrieve input value and add to storage\n    getInputValue: function() {\n      var that = this;\n      \n      // Check for any instance of a key press\n      this.$todoInput.on('keypress', function(event) {\n        var keyPressed = event.which || event.keyCode;\n  \n        // Check if \"Enter\" button is pressed\n        if (keyPressed === ENTER_KEY) {\n          // Get submitted value from input and create object\n          var $input = $(event.target);\n          var val = $input.val().trim();\n          var todoItem = {\n            task: val,\n            completed: false\n          };\n          // Add new submitted todo to storage\n          that.todos.push(todoItem);\n          // Once new todo is added to array, update storage\n          store.set('todos', that.todos);\n          // Clear input field\n          that.$todoInput.val('');\n          // Make todo an HTML element\n          todoHTML =\n          '<li class=\"todo-item\">' +\n            '<div class=\"todo-view\">' +\n              '<input type=\"checkbox\">' +\n              '<label>' + todoItem.task + '</label>' +\n              '<button class=\"delete-icon\"><i class=\"fas fa-times fa-lg\"></i></button>' +\n            '</div>' +\n            '<input class=\"todo-edit\" value=\"' + todoItem.task + '\">'+\n          '</li>';\n          // Append input value\n          that.$todosList.append(todoHTML);\n          that.$deleteIcon = $('.delete-icon');\n          // Make \"Clear All\" button visible\n          that.$clearButton.addClass('is-visible');\n          that.activateDeleteButton();\n        }\n      });\n    },\n\n\n    // Toggle checkbox\n    toggleCheckbox: function(event) {\n      var isChecked = $(event.currentTarget).prop('checked');\n      var todoValue = $(event.currentTarget).siblings('label').text();\n      var index = this.getIndex(todoValue);\n      \n      this.todos[index].completed = isChecked\n      store.set('todos', this.todos);\n      this.displayTodos(this.todos);\n    },\n\n\n    // Focus on todo item for editing\n    focusOnTodoForEditing: function(event) {\n      $(event.currentTarget).closest('li').addClass('editing');\n      $('.todo-edit').focus();\n    },    \n\n\n    // Update todo item on keypress\n    updateOnEnter: function(event) {\n      var keyPressed = event.which || event.keyCode;\n\n      if (keyPressed === ESCAPE_KEY) {\n        this.escPressed = true;\n        this.$todoInput.focus(); // this will trigger updateAndClose()\n      }\n      if (keyPressed === ENTER_KEY) {\n        this.$todoInput.focus(); // this will trigger updateAndClose()\n      }\n    },\n\n\n    // Update todo and exit edit mode\n    updateAndClose: function(event) {\n      var defaultValue = event.target.defaultValue;\n      var newValue = event.target.value.trim();\n      var index = this.getIndex(defaultValue);\n\n      // If escape button is pressed, don't update todo\n      if (this.escPressed === true) {\n        this.displayTodos(this.todos);\n      }\n      // If edited todo is empty string, remove todo\n      else if (newValue === '') {\n        this.$todoInput.focus();\n        this.todos.splice(index, 1);\n        store.set('todos', this.todos);\n        this.displayTodos(this.todos);\n      }\n      // Otherwise, update todo\n      else {\n        // this.$todosInput.focus() placed before displayTodos to prevent\n        // trigger of blur event which will rerun this entire function\n        this.$todoInput.focus();\n        this.todos[index].task = newValue;\n        store.set('todos', this.todos);\n        this.displayTodos(this.todos);\n      }\n\n      // Exit edit mode\n      $(event.currentTarget).closest('li').removeClass('editing');\n      \n      // Set to false to allow update for future blur events\n      this.escPressed = false;\n    },\n\n\n    // Clear all todo items on button click\n    activateClearButton: function() {\n      this.$clearButton.on('click', function(event) {\n        event.preventDefault();\n        // Set this.todos to empty array to erase all data.\n        // store.set('todos', []) will not erase this.todos\n        // but instead display duplicate list on screen when\n        // a new todo is created after pressing clear all button\n        this.todos = [];\n        store.set('todos', this.todos);\n\n        this.$todosList.empty();\n      }.bind(this))\n    },\n\n    \n    // Retrieve index for selected todo item \n    getIndex: function(task) {\n      for (var i = 0; i < this.todos.length; i++) {\n        if (this.todos[i].task === task) {\n          return i;\n        }\n      }\n    },\n\n    \n    // Delete todo item on icon click\n    activateDeleteButton: function() {\n      var that = this;\n\n      this.$deleteIcon.on('click', function(event) {\n        event.preventDefault();\n        // Get name of todo item\n        var task = event.currentTarget.parentElement.textContent;\n        // Get index for clicked item\n        var index = that.getIndex(task);\n        // Remove item from list based on index\n        if (index > -1) {\n          that.todos.splice(index, 1);\n        }\n        // Update local storage\n        store.set('todos', that.todos);\n        // Display todos\n        that.displayTodos(that.todos);\n      })\n    },\n\n\n    // Check that storage has at least one todo item\n    storageHasData: function() {\n      return this.todos.length > 0;\n    },\n\n\n    // Display all todos with data provided\n    displayTodos: function(todos) { \n      // Display each todo item in storage on screen\n      var todos = todos.map(function(todo) {\n        var isChecked;\n        var completed;\n\n        if (todo.completed === true) {\n          isChecked = 'checked';\n          completed = 'completed';\n        } else {\n          isChecked = '';\n          completed = '';\n        }\n\n        return '<li class=\"todo-item\">' +\n          '<div class=\"todo-view\">' +\n            '<input type=\"checkbox\"' + isChecked + '>' +\n            '<label class=\"' + completed + '\">' + todo.task + '</label>' +\n            '<button class=\"delete-icon\"><i class=\"fas fa-times fa-lg\"></i></button>' +\n          '</div>' +\n          '<input class=\"todo-edit\" value=\"' + todo.task + '\">'+\n        '</li>';\n      });\n      this.$todosList.empty();\n      this.$todosList.append(todos);\n      this.$deleteIcon = $('.delete-icon');\n      this.activateDeleteButton();\n    },\n\n    \n    // Automatically display all todos on page load\n    displayTodosOnLoad: function() {\n      // Check if todos storage had any todo items\n      if (this.storageHasData() === true) {\n        this.displayTodos(this.todos);\n      }\n    },\n  };\n\n  App.init();\n})();\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./scss/style.scss":
/*!*************************!*\
  !*** ./scss/style.scss ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./scss/style.scss?");

/***/ })

/******/ });