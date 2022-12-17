import { useState } from 'react';

import Todo from './components/Todo'


const App = () => {

  const [todos, setTodos] = useState ([
    {
      description: 'Regar plantas',
      checked: false
    }, { 
      description: 'Cortar uñas',
      checked: true
    }
  ])
  
  const [inputValue, setInputValue] = useState ('')

  const [currentFilter, setCurrentFilter] = useState('Todas')

  /**
   * Esta función esta ligada al input 
   * y se ejecuta al ingresar o borrar un caractér
   */
  const handleChange = (e) => {
    const newText = e.target.value
    setInputValue(newText)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const alreadyExist = todos.some(item => item.description === inputValue)
  
    if (alreadyExist) {
      alert('El todo que intentas agregar ya existe en la lista')
      return
    }

    const newTodo = {
      description: inputValue,
      checked: false
    }

    const list = [...todos, newTodo]
    setTodos(list)
    setInputValue('')
  }

  const deleteTodo = (itemClicked) => {
    const newTodos = todos.filter(item => item !== itemClicked)
    setTodos(newTodos)
    console.log(newTodos)
  }

  const handleSelectChange = (e) => {
    setCurrentFilter(e.target.value)
  }

  const handleCheck = (inputCheckValue, text) => {
    const checkedTodoIdx = todos.findIndex(item => item.description === text)
    const checkedTodo = todos[checkedTodoIdx]
    checkedTodo.checked = inputCheckValue

    const prevTodos = todos.slice(0, checkedTodoIdx)
    const nextTodos = todos.slice(checkedTodoIdx+1, todos.length)
    // const prevTodos = todos.filter(item => item.description !== text)
    const newTodos = [...prevTodos, checkedTodo, ...nextTodos]
    setTodos(newTodos)
    console.log(prevTodos)
    console.log(nextTodos)
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
       value= {inputValue}
       onChange={handleChange}
       placeholder='Ingresar todo...' />

      <button>Publicar</button>
      </form>

      
      {todos.map(item => {
        return (
          <Todo
            key={item.description}
            text={item.description}
            isChecked={item.checked}
            onCheck={handleCheck}
            deleteTodo={() => deleteTodo(item)}
          />
        )
      })}
      
    </div>
  );
}

export default App;
