import React, { useState } from 'react';
import { TodoListItem } from './components/TodoListItem';


const initialTodos: Array<Todo> = [
  {text: "Scope Meeting", complete: true},
  {text: "Study for Midterms", complete: false}
];



const App: React.FC = () => {
  const [todos, setTodos] = useState(initialTodos);

  const toggleTodo = (selectedTodo: Todo) => {
    const newTodos = todos.map(todo => {
      if (todo === selectedTodo){
        return{
          ...todo,
          complete: !todo.complete
        }
      }
      //if condition not met, just return todo as it was.
      return todo;
    });
    setTodos(newTodos);
  };
 
  return(
    <React.Fragment>
      <TodoListItem todo = {todos[0]} toggleTodo = {toggleTodo} />
      <TodoListItem todo = {todos[1]} toggleTodo = {toggleTodo} />
    </React.Fragment>
  )
 

}

export default App;
