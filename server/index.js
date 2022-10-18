const express = require('express');
const Tasks = require('./data/tasks');
const fetchID = require('./utils');

const app = express();
const PORT = 4000;
const http = require('http').Server(app);
const cors = require('cors');

const socketIO = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000'
  }
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

socketIO.on('connection', socket => {
  console.log(`User: ${socket.id} connected!`);

  socket.on('createTask', data => {
    const newTask = { id: fetchID(), title: data.task};
    Tasks['new'].items.push(newTask);
    socket.emit('tasks', Tasks);
  });

  socket.on('taskDragged', data => {
    const {source, destination} = data;
    console.log(data);
    const itemMoved = {
      ...Tasks[source.droppableId].items[source.index]
    };
    console.log('ItemMoved>>> ', itemMoved);
    Tasks[source.droppableId].items.splice(source.index, 1);
    Tasks[destination.droppableId].items.splice(destination.index, 0, itemMoved);
    console.log('Source >>>', Tasks[source.droppableId].items);
    console.log('Destination >>>', Tasks[destination.droppableId].items);
    socket.emit('tasks', Tasks);
  });



  socket.on('disconnect', () => {
    socket.disconnect();
    console.log('User disconnected');
  });
});

// Load the Tasks via the /api route
app.get('/api', (req, res) => {
  res.json(Tasks);
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
