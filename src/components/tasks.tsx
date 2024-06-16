//tasks component

import { useEffect, useState } from 'react'


export interface Task {
    id: number
    description: string
    completed: boolean
}

export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]); //Task[] = array of tasks

    useEffect(() => {
        fetch('http://localhost:3000/tasks')
            .then(response => response.json())
            .then(json => setTasks(json))
    }, [])


    return (
        <div className="flex flex-col gap-4 p-4">
            <ul className="flex flex-col gap-2 p-4 rounded-lg bg-slate-100">
                {tasks.map((task) => (
                    <li className="flex items-center gap-2 p-2 rounded-lg bg-slate-200"
                     key={task.id}>{task.description}</li>
                ))}
            </ul>
        </div>
    )
}