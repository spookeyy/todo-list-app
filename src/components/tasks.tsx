//tasks component

import { useEffect, useState } from "react";
import AddTask from "./addTask";

export interface Task {
  id: number;
  description: string;
  completed: boolean;
}

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]); //Task[] = array of tasks

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((response) => response.json())
      .then((json) => setTasks(json));
  }, []);

  //update task status
const taskStatusChanged = (id: number, completed: boolean) => {
  const newTasks = tasks?.map((task) => {
    if (task.id === id) { //check if task.id is equal to id
      return { ...task, completed };
    }
    return task;
  });
  setTasks(newTasks);
};

//delete task
const deleteTask = (id: number) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
    }).then(() => {
      const newTasks = tasks.filter((task) => task.id !== id);
      setTasks(newTasks);
    });
  };

  return (
    <div className="flex flex-col-2 gap-4 p-4 rounded-lg bg-gray-200">
      <ul className="flex flex-col gap-2 p-4 rounded-lg bg-slate-100">
        {tasks.map((task) => (
          <li
            className="flex items-center gap-2 p-2 rounded-lg bg-blue-200"
            key={task.id}
          >
            {task.description}
            <input
              onChange={() => taskStatusChanged(task.id, !task.completed)}
              type="checkbox"
              className="w-4 h-4"
              checked={task.completed}
            />
            <button
              onClick={() => deleteTask(task.id)}
              className="ml-auto p-2 text-sm font-medium text-white bg-red-300 rounded-lg hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 position-absolute right-0"
            >
              delete
            </button>
          </li>
        ))}
      </ul>

      <AddTask />
    </div>
  );
}

export default Tasks;
