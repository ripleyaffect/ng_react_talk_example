const React = require('react/addons');
const Reflux = require('reflux');
const cx = require('classnames');


/**
 * Initialize actions related to the TodoList
 */
const TodoListActions = Reflux.createActions([
  'itemAdded',
  'itemsAdded',
  'itemDeleted',
  'itemToggled'
]);


/**
 * Handle actions related to the TodoList
 */
const TodoListStore = Reflux.createStore({
  listenables: TodoListActions,

  getInitialState: function () {
    this.items = [];
    return {items: this.items}
  },

  onItemAdded: function (newItem) {
    this.items.push(newItem);
    this.updateState();
  },

  onItemsAdded: function (newItems) {
    this.items = this.items.concat(newItems);
    this.updateState();
  },

  onItemDeleted: function (itemIndex) {
    this.items.splice(itemIndex, 1);
    this.updateState();
  },

  onItemToggled: function (itemIndex) {
    this.items[itemIndex].complete = !this.items[itemIndex].complete
    this.updateState();
  },

  updateState: function () {
    this.trigger({items: this.items});
  }
})


/**
 * TodoItem
 */
const TodoItem = React.createClass({
  handleDelete: function () {
    const {index} = this.props;
    TodoListActions.itemDeleted(index)
  },

  handleToggle: function () {
    const {index} = this.props;
    TodoListActions.itemToggled(index);
  },

  render: function () {
    const {complete, content, weight, index} = this.props;

    const toggleClasses = cx({
      'todo-item-toggle-button': true,
      'complete': complete,
      'incomplete': !complete
    });

    const contentClasses = cx({
      'todo-item-content': true,
      'complete': complete,
      'incomplete': !complete
    });

    return (
      <div className="todo-item">
        <div
            className={toggleClasses}
            onClick={this.handleToggle}>
        </div>
        <div className={contentClasses}>
          {content}
        </div>
        <div
            className="todo-item-delete-button"
            dangerouslySetInnerHTML={{__html: '&times;'}}
            onClick={this.handleDelete}/>
      </div>
    );
  }
})

/**
 * TodoList
 */
const TodoList = React.createClass({
  mixins: [Reflux.listenTo(TodoListStore, 'updateState', 'updateState')],

  getInitialState: function () {
    return {
      items: []
    }
  },

  updateState: function (newState) {
    this.setState(newState);
  },

  componentDidMount: function () {
    const {items} = this.props;
    this.setState({items: items || []});
    // Add any initial items to the store
    TodoListActions.itemsAdded(items)
  },

  handleAddItem: function (event) {
    event.preventDefault();
    TodoListActions.itemAdded({
      content: this.refs.newItemContent.getDOMNode().value,
      weight: 1,
      complete: false
    });
    this.refs.newItemContent.getDOMNode().value = '';
  },

  render: function () {
    const {items} = this.state;

    const todoItemNodes = items.map(function (item, index) {
      return (
        <TodoItem {...item} key={index} index={index}/>
      );
    });

    return (
      <div className="todo-list">
        <form
            onSubmit={this.handleAddItem}
            acceptCharset="utf-8">
          <input
              type="text"
              ref="newItemContent"
              placeholder="New Item"/>
          <input
              type="submit"
              value="Add"/>
        </form>
        {todoItemNodes}
      </div>
    );
  }
})

module.exports = TodoList
