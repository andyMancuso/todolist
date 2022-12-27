import { useState } from 'react';

import Todo from './components/Todo'




const App = () => {

  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("list")) || [])
  
  // ([
  //   {
  //     description: 'Regar plantas',
  //     checked: false,
  //     favorited: true
  //   }, {
  //     description: 'Cortar uñas',
  //     checked: true,
  //     favorited: false
  //   }
  // ])

  const [inputValue, setInputValue] = useState('')

  const [currentFilter, setCurrentFilter] = useState('Todas')

  const [isEditMode, setIsEditMode] = useState(false)

  const [editingIdx, setEditingIdx] = useState()



  const filterFn = (item) => {
    if (currentFilter === 'Completadas') {
      return item.checked === true
    }

    if (currentFilter === 'Pendientes') {
      return item.checked === false
    }

    if (currentFilter === 'Importantes') {
      return item.favorited === true
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

    if (inputValue === '') {
      alert('Por favor ingrese un todo c:')
      return
    }

    if (!isEditMode) {

      const newTodo = {
        description: inputValue,
        checked: false,
        favorited: false
      }

      const list = [...todos, newTodo]
      setTodos(list)
      setInputValue('')
      localStorage.setItem("list", JSON.stringify(list));

    } else {
      const editingTodo = todos[editingIdx]
      editingTodo.description = inputValue

      const prevTodos = todos.slice(0, editingIdx)
      const nextTodos = todos.slice(editingIdx + 1, todos.length)

      const newTodos = [...prevTodos, editingTodo, ...nextTodos]
      setTodos(newTodos)

      setIsEditMode(false)
      setInputValue('')
    }
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
    const nextTodos = todos.slice(checkedTodoIdx + 1, todos.length)

    const newTodos = [...prevTodos, checkedTodo, ...nextTodos]
    setTodos(newTodos)
  }

  const handleSelectChange = (e) => {
    setCurrentFilter(e.target.value)
  }

  const handleEdit = (itemClicked) => {
    setIsEditMode(true)
    const editingTodoIdX = todos.findIndex(item => item === itemClicked)
    const editingTodo = todos[editingTodoIdX]
    setEditingIdx(editingTodoIdX)
    setInputValue(editingTodo.description)
  }

  const handleFavorite = (itemClicked) => {
    const important = todos.find(item => item === itemClicked)

    if (important.favorited === true) {
      important.favorited = false
    } else {
      important.favorited = true
    }

    localStorage.setItem("important", JSON.stringify(important));
    console.log(important)

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
        <option value='Importantes'>Importantes</option>
      </select>

      <form onSubmit={handleSubmit}>
        <input
          value={inputValue}
          onChange={handleChange}
          placeholder='Ingresar todo...' />

        <button onClick={handleSubmit}>
          {isEditMode ? 'Editar' : 'Publicar'}
        </button>
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
            favoriteTodo={() => handleFavorite(item)}
            isImportant={item.favorited}
          />
        )
      })}
    </div>
  );
}

export default App;