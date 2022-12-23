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
  
  const [inputValue, setInputValue] = useState('')

  const [currentFilter, setCurrentFilter] = useState('Todas')

  const [isEditMode, setIsEditMode] = useState(false)

  const [buttonText, setButtonText] = useState('Publicar')

  
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
  }

  const handleCheck = (inputCheckValue, text) => {
    const checkedTodoIdx = todos.findIndex(item => item.description === text)
    const checkedTodo = todos[checkedTodoIdx]
    checkedTodo.checked = inputCheckValue
    
    const prevTodos = todos.slice(0, checkedTodoIdx)
    const nextTodos = todos.slice(checkedTodoIdx+1, todos.length)

    const newTodos = [...prevTodos, checkedTodo, ...nextTodos]
    setTodos(newTodos)
  }
  
  const handleSelectChange = (e) => {
    setCurrentFilter(e.target.value)
  }

  const handleEdit = (itemClicked) => {
    setIsEditMode(true)
    console.log(isEditMode)

    const editingTodoIdx = todos.findIndex(item => item === itemClicked)
    const editingTodo = todos[editingTodoIdx]
    const newValue = editingTodo.description

    if (isEditMode === true) {
      setButtonText('Editar')
      setInputValue(newValue)
    } else {
      setButtonText('Publicar')
      setInputValue('cochinada')
    }
}

  const editTodo = (itemClicked) => {

    if (isEditMode === true) {
      const editingTodoIdx = todos.filter(item => item === itemClicked)
      const editingTodo = todos[editingTodoIdx]
      editingTodo.description = inputValue

      const prevTodos = todos.slice(0, editingTodoIdx)
      const nextTodos = todos.slice(editingTodoIdx+1, todos.length)

      const newTodos = [...prevTodos, editingTodo, ...nextTodos]
      setTodos(newTodos)

      
    }

    setIsEditMode(false)
    if (isEditMode === false) {
      setButtonText('Publicar')
    } else {
    }
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

        <button onClick={editTodo}>{buttonText}</button>
      </form>

      {todos.filter(filterFn).map(item => {
        return (
          <Todo
            key={item.description}
            text={item.description}
            isChecked={item.checked}
            onCheck={handleCheck}
            deleteTodo={() => deleteTodo(item)}
            editTodo={() => handleEdit(item)}
            // () => editTodo(item)
          />
        )
      })}
    </div>
  );
}

export default App;





  // const editTodo = (itemClicked, text) => {
  //   // const editingTodo = todos.map(item => (item.description === text ? setInputValue(itemClicked) : item ))
  //   //   setTodos(editingTodo)

  //   // const editingTodo = todos.filter(item => item.description === itemClicked)
  //   // setInputValue(editingTodo)
  //   // console.log(editingTodo)

  //   // const editingTodoIdx = todos.findIndex(item => item.description === text)
  //   // const editingTodo = todos[editingTodoIdx]
  //   // console.log(editingTodo)

  //   if(itemClicked === itemClicked) {

  //   }
  // }