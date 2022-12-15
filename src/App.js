import { useState } from "react";


const App = () => {

  const [todos, setTodos] = useState ([
    "Hola, soy un todo",
    "El bicho"
  ])
  
  const [todo, setTodo] = useState ("")

  /**
   * Esta función esta ligada al input 
   * y se ejecuta al ingresar o borrar un caractér
   */
  const handleChange = (e) => {
    const newText = e.target.value
    setTodo(newText)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const list = [...todos, todo]
    setTodos(list)
    setTodo("")
  }

  const deleteTodo = (itemClicked) => {
    const newTodos = todos.filter(item => item !== itemClicked)
    setTodos(newTodos)
  }


  return (
    <div>

      <h1>
        Todo's Mancussi
      </h1>

      <form onSubmit={handleSubmit}>
      <input 
       value= {todo}
       onChange={handleChange}
       placeholder="Ingresar todo..." />

      <button>Publicar</button>
      </form>

      {todos.map(item => {
        return (
          <div key={item}>
            <span >- {item}</span>
            <button onClick={ () => deleteTodo(item)}>X</button> 
          </div>
        )
      })}
      
    </div>
  );
}

export default App;
