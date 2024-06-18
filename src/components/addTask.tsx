//add task to list of tasks component
import { useState, useEffect } from "react";

export interface Task {
    id: number;
    description: string;
    completed: boolean;
}

export default function AddTask() {
    const [task, setTask] = useState<Task>({ id: 0, description: "", completed: false });
    const [tasks, setTasks] = useState<Task[]>([]);

    //fetch tasks
    useEffect(() => {
        fetch("http://localhost:3000/tasks")
            .then((response) => response.json())
            .then((json) => setTasks(json));
    }, []);

    //add task
    const addTask = (e: React.FormEvent) => {
        e.preventDefault();
        fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        }).then(() => {
            fetch("http://localhost:3000/tasks")
                .then((response) => response.json())
                .then((json) => setTasks(json));
        });

        setTask({ id: 0, description: "", completed: false }); //reset task
    };

   
    return (
        <div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-gray-200 min-h-screen ">
            <h1 className="text-2xl font-bold">Add Task</h1>
            <form
                onSubmit={addTask}
                className="flex flex-col gap-4 p-4 rounded-lg bg-slate-100"
            >
                <input
                    type="text"
                    name="description"
                    value={task.description}
                    onChange={(e) =>
                        setTask({ ...task, description: e.target.value })
                    }
                    placeholder="Enter task"
                    className="p-2 rounded-lg"
                    onFocus={(e) => e.target.select()}
                    required
                />
                <button
                    type="submit"
                    // onClick={addTask}
                    className="p-2 text-sm font-medium text-white bg-blue-300 rounded-lg hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                    Add Task
                </button>
            </form>
        </div>
    )
}