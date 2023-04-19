import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskPropsType} from "./TodoList";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    const [tasks, setTasks] = useState<Array<TaskPropsType>>([
        {id: v1(), title: "CSS & HTML", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},

    ]);

    function addTask(title: string) {
        let newTask = {
            id: v1(),
            title: title,
            isDone: false
        };
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(task => task.id !== id);
        setTasks(filteredTasks);
    }

    let [filter, setFilter] = useState<FilterValuesType>("all");

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let tasksForTodoList = tasks;

    if (filter === 'completed') {
        tasksForTodoList = tasks.filter(task => task.isDone === true)
    }
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(task => task.isDone === false)
    }


    return (
        <div className="App">
            <TodoList title="What to learn"
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}

            />
        </div>
    );
}


export default App;
