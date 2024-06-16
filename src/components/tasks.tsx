//tasks component

import { useEffect, useState } from 'react'


export interface Task {
    id: number
    description: string
    completed: boolean
}

export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/tasks')
            .then(response => response.json())
            .then(json => setTasks(json))
    }, [])


    return (
        <div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>{task.description}</li>
                ))}
            </ul>
        </div>
    )
}