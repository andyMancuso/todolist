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

  
  const filterFn = (item) => {
    if (currentFilter === 'Completadas') {
      return item.checked === true
    } 
    
    if (currentFilter === 'Pendientes') {
      return item.checked === false
    }
    
    return true
  }
      

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
      checked: false,
      filter: currentFilter
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

  const handleCheck = (inputCheckValue, text) => {
    const checkedTodoIdx = todos.findIndex(item => item.description === text)
    const checkedTodo = todos[checkedTodoIdx]
    checkedTodo.checked = inputCheckValue
    
    const prevTodos = todos.slice(0, checkedTodoIdx)
    const nextTodos = todos.slice(checkedTodoIdx+1, todos.length)

    const newTodos = [...prevTodos, checkedTodo, ...nextTodos]
    setTodos(newTodos)
    console.log(prevTodos)
    console.log(nextTodos)
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
       value= {inputValue}
       onChange={handleChange}
       placeholder='Ingresar todo...' />

      <button>Publicar</button>
      </form>

      
      {todos.filter(filterFn).map(item => {
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
