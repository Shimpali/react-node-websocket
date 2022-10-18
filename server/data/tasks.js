const fetchID = require('../utils');

const Tasks = {
  new: {
    title: 'new',
    items: [
      {
        id: fetchID(),
        title: 'Task 1'
      }
    ]
  },
  'in-progress': {
    title: 'in-progress',
    items: [
      {
        id: fetchID(),
        title: 'Task 2'
      }
    ]
  },
  completed: {
    title: 'completed',
    items: [
      {
        id: fetchID(),
        title: 'Task 3'
      }
    ]
  }
};

module.exports = Tasks;
