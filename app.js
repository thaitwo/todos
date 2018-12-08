
(function(){
  var ENTER_KEY = 13;

  var App = {
    init: function() {
      this.$todosContainer = $('#todos-container');
      this.$todoInput = $('#todo-input');
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
          todo = '<div class="todo-item"><p>' + todo + '<span class="delete-icon"><i class="fas fa-times fa-lg"></i></span></p></div>';
          
          // Clear input field
          that.$todoInput.val('');
  
          // Append input value
          that.$todosContainer.append(todo);
        }
      })
    }
  };

  App.init();
})();
