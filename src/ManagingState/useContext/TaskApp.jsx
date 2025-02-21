import AddTask from './AddTask.js';
import TaskList from './TaskList.js';
import { TasksProvider } from './TasksContext.js';

export default function TaskApp() {
  // function handleAddTask(text) {
  //   dispatch({
  //     type: 'added',
  //     id: nextId++,
  //     text: text,
  //   });
  // }

  // function handleChangeTask(task) {
  //   dispatch({
  //     type: 'changed',
  //     task: task
  //   });
  // }

  // function handleDeleteTask(taskId) {
  //   dispatch({
  //     type: 'deleted',
  //     id: taskId
  //   });
  // }

  return (
    <TasksProvider>
      <h1>Day off in Kyoto</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  );
}


