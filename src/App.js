import React, {useState} from "react";
import { nanoid } from "nanoid";

import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import Todo from "./components/Todo";

function App(props) {

  const filters = ["ALL", "ACTIVE", "COMPLETED"];

  const [tasks, setTasks] = useState(props.tasks);
  const [activeFilter, setFilter] = useState("ALL");

  const changeFilter = (filter) => {
    setFilter(filter);
  }

  const filterList = filters?.map(filterName => (
    <FilterButton 
      filter={filterName} 
      changeFilter={changeFilter}
      isPressed={filterName === activeFilter}
    />
  ));

  const addTask = (name) => {
    const newTask = { id: "todo-" + nanoid(), name, completed: false};
    setTasks([...tasks, newTask]);
  }

  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map(task => {
      if (id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  }
  
  const deleteTask = (id) => {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  } 

  const editTaskName = (id, newName) => {
    const updatedTasks = tasks.map(task => {
      if(id === task.id) {
        return {...task, name: newName};
      }
      return task;
    });
    setTasks(updatedTasks);
  } 

  const taskList = tasks
    .filter(task => {
      if(activeFilter === "ALL") {
        return true;
      } else if(activeFilter === "ACTIVE") {
        return !task.completed;
      } else {
        return task.completed;
      }
    })
    .map(task => (
    <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTaskName={editTaskName}
      />
    )
  );

  const headingText = `${taskList.length} tasks remaining`;

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
