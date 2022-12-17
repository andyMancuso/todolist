import { useState } from 'react';

import Todo from './components/Todo'


const App = () => {

  const [todos, setTodos] = useState ([
    {
      description: 'Regar plantas',
      checked: false
    }, { 
      description: 'Cortar uñas',
      checked: false
    }
  ])
  
  const [todo, setTodo] = useState ('')

  const [currentFilter, setCurrentFilter] = useState('Todas')

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
    const alreadyExist = todos.some(item => item.description === todo)
  
    if (alreadyExist) {
      alert('El todo que intentas agregar ya existe en la lista')
      return
    }

    const newTodo = {
      description: todo,
      checked: false
    }

    const list = [...todos, newTodo]
    setTodos(list)
    setTodo('')
  }

  const deleteTodo = (itemClicked) => {
    const newTodos = todos.filter(item => item !== itemClicked)
    setTodos(newTodos)
  }

  const handleSelectChange = (e) => {
    setCurrentFilter(e.target.value)
  }


  return (
    <div>

      <h1>
        Todo's Mancussi
      </h1>

      <select onChange={handleSelectChange} value={currentFilter}>
        <option value='Todas'>Todas</option>
        <option value='Pendientes'>Pendientes</option>
        <option value='Completadas'>Completadas</option>
      </select>
      
      <form onSubmit={handleSubmit}>
      <input 
       value= {todo}
       onChange={handleChange}
       placeholder='Ingresar todo...' />

      <button>Publicar</button>
      </form>

      
      {todos.map(item => {
        return (
          <Todo
            key={item.description}
            text={item.description}
            deleteTodo={() => deleteTodo(item)}
          />
        )
      })}
      
    </div>
  );
}

export default App;
