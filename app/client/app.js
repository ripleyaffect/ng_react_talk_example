// We use browserify to work with modules
const angular = require('angular');
const ngreact = require('ngreact');
const TodoList = require('./components/TodoList');
const data = require('./data');

// Inject ngReact ('react') as a dependency for our angular app
const app = angular.module('app', ['react'])
  .controller('appController', ['$scope', function ($scope) {
    $scope.items = data;
  }])

  // Pure angular method. We create a directive that renders a list of todos
  .directive('todoList', [function () {
      return {
        restrict: 'E',  // Restrict the directive to an Element
        templateUrl: '/static/templates/todo_list.html',
        link: function (scope) {
          // Object bound to new item form
          scope.newItem = {
            content: '',
            weight: 1
          };

          /**
           * 
           */
          scope.handleAddItem = function () {
            var addedItem = {
              content: scope.newItem.content,
              weight: scope.newItem.weight
            };
            scope.items.push(addedItem);
            scope.newItem.content = '';
          }

          scope.handleDeleteItem = function (index) {
            scope.items.splice(index, 1);
          }

          scope.handleToggleItem = function (index) {
            scope.items[index].complete = !scope.items[index].complete;
          }
        }
      };
    }])

  // React method using ng-react. We render a react component that renders a list of TodoComponents
  .directive('todoListReact', function (reactDirective) {
      return reactDirective(TodoList, ['items']);
    });


module.exports = app
