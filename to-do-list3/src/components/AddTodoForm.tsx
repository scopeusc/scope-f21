import React, { ChangeEvent, FormEvent, useState } from 'react';

interface AddTodoFormProps {
    addTodo: AddTodo;
 }
 
export const AddTodoForm: React.FC<AddTodoFormProps> = ({addTodo}) => {
    //we are going to return a form

    const [newTodo, setNewTodo] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTodo(e.target.value);
    };
    const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault(); //prevents default form submitting
        addTodo(newTodo);
    };
 
 
    return <form>
        <input type = "text" value = {newTodo} onChange = {handleChange}></input>
        <button type = "submit" onClick={handleSubmit}>Add Todo</button>
    </form>
 }
 