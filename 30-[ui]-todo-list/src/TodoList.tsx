/* 
States: 2 states
1. task (input)
2. tasks (array of tasks)
 
Each task should have unique ID:
- We can either use uuid to generate unique id
- OR we can use a simple incrementing counter (we will use this - but to see how to use uuid, look at README file)
*/

import { useEffect, useState } from "react";

/* Unique ID generation using simple counter 

We could just do 

let taskId = 0

and then increment this by doing taskId++ while using it. This works, but we need to be careful and not let other 
code update it at any point. So just to be safe, we can follow IIFEE pattern (immediately invoke function). 
*/

// newId gets back a function () => id++. Here this is possible due to closure of id where it cannot be editted in other places. We can only increment it by calling newId()
const newId = (() => {
  let id = 0;
  return () => id++;
})();

type Task = { id: number; label: string };

const TodoList = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [message, setMessage] = useState(""); // for aria-live

  const handleAddTask = () => {
    setTasks((prev) => prev.concat({ id: newId(), label: task }));
    setTask("");
    setMessage(`Task "${task}" added`);
  };

  const handleDeleteTask = (id: number) => {
    // Add window confirmation before destructive task
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks((prev) => prev.filter((item) => item.id !== id));
      setMessage(`Task "${task}" deleted`);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="todo-container">
      <h1>Todo list with delete</h1>

      <form
        className="todo-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTask();
        }}
      >
        <input
          type="text"
          aria-label="Add new task"
          placeholder="Add your task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        {/* type='submit' by default - we dont need to specify */}
        <button>Submit</button>
      </form>

      {tasks.length === 0 ? (
        <h3>Please add your first task</h3>
      ) : (
        <div>
          {/* aria-live = polite  so that the current screen reader voice will not interrupt*/}
          <div aria-live="polite">{message}</div>
          <ul className="task-list">
            {tasks.map(({ id, label }) => (
              <li key={id} className="task-item">
                <span>{label}</span>
                <button onClick={() => handleDeleteTask(id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TodoList;
