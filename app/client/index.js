const app = require('./app');

// React app entry point Only render the component if the
if (document.getElementById('react-app')) {
  const React = require('react');
  const TodoList = require('./components/TodoList');
  React.render(
    <TodoList items={require('./data')}/>,
    document.getElementById('react-app'))
}
