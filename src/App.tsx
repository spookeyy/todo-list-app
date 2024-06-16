// import React from 'react'
import Tasks from './components/tasks'


function App() {

  return (
    <>
      <div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-gray-200 min-h-screen ">
        <h1 className="text-2xl font-bold">Todo List</h1>
        <div className="flex flex-col gap-4 p-4 rounded-lg bg-slate-100">
          <Tasks />
          </div>
        
      </div>
    </>
  );
}

export default App
