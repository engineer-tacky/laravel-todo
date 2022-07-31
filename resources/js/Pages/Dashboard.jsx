import React, { useState } from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";

export default function Dashboard(props) {
    console.log('rendered');
    const { todos, user_id } = props;
    let array = [];
    todos.map((todo) => {
        if(todo.is_done == 1) {
            array.push(todo.id);
        }
    })
    const [checkedValues, setCheckedValues] = useState(array);
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        if (checkedValues.includes(e.target.name)) {
            console.log(e.target.name);
            setCheckedValues(
                checkedValues.filter(
                    (checkedValue) => checkedValue !== e.target.name
                )
            );
        } else {
            setCheckedValues([...checkedValues, e.target.name]);
        }
    };

    const valueChange = (e) => {
        setValue(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();
        Inertia.post("/todos/create/"+user_id, [value]);
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            You're logged in!
                        </div>
                        <h1>Todo List</h1>
                        <ul className="todo-list">
                            {todos.map((todo) => {
                                return (
                                    <li className="todo-item" key={todo.id}>
                                        <span className="todo-item__text">
                                            <input
                                                type="checkbox"
                                                name={todo.id}
                                                id=""
                                                onChange={handleChange}
                                                checked={checkedValues.includes(
                                                    todo.id
                                                )}
                                            />
                                            {todo.todo_name}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="p-6 bg-white border-b border-gray-200">
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="todo">Todo:</label>
                                <input
                                    id="todo"
                                    onChange={valueChange}
                                />
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
