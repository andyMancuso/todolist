
import { useState, useEffect } from 'react';
import Select from '../../components/Select';
import Todo from '../../components/Todo'


const STATUS_LIST = [
  { value: 'Todas'},
  { value: 'Pendientes'},
  { value: 'Completadas'}
]


const Home = ({categoriesList}) => {
  
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('listita')) || [])

  useEffect(() => {
    window.localStorage.setItem('listita', JSON.stringify(todos))
  }, [todos])

  const [inputValue, setInputValue] = useState('')

  const [currentFilter, setCurrentFilter] = useState('Todas')

  const [isEditMode, setIsEditMode] = useState(false)

  const [editingIdx, setEditingIdx] = useState()

  const [categorySelected, setCategorySelected ] = useState('')


  const filterFn = (item) => {

    if (currentFilter === 'Todas') {
      return item
    }

    if (currentFilter === 'Completadas') {
      return item.checked === true
    }

    if (currentFilter === 'Pendientes') {
      return item.checked === false
    }

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
        favorited: false,
        category: categorySelected
      }

      const list = [...todos, newTodo]
      setTodos(list)
      setInputValue('')
      localStorage.setItem('list', JSON.stringify(list));

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
    setInputValue('')
    setIsEditMode(false)
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

  const handleEdit = (itemClicked) => {
    setIsEditMode(true)
    const editingTodoIdX = todos.findIndex(item => item === itemClicked)
    const editingTodo = todos[editingTodoIdX]
    setEditingIdx(editingTodoIdX)
    setInputValue(editingTodo.description)
  }

  const handleFavorite = (itemClicked) => {

    const importantIdx = todos.findIndex(item => item === itemClicked)
    const importantItem = todos[importantIdx]

    const newImportant = { ...importantItem }

    newImportant.favorited = !newImportant.favorited

    const prevTodos = todos.slice(0, importantIdx)
    const nextTodos = todos.slice(importantIdx + 1, todos.length)

    const newTodos = [...prevTodos, newImportant, ...nextTodos]

    setTodos(newTodos)
  }
  
    const handleCategoryChange = (e) => {
      setCategorySelected(e.target.value)
    }
  
    const handleStatusFilterChange = (e) => {
      setCurrentFilter(e.target.value)
    }
  

  return (

    <div>

      <h1>
        Todo's Mancussi
      </h1>

      <Select
        onChange={handleCategoryChange}
        options={categoriesList.map(item => ({
          value: item
        }))}
      />

      <form onSubmit={handleSubmit}>
        <input
          value={inputValue}
          onChange={handleChange}
          placeholder='Ingresar todo...' />

        <button onClick={handleSubmit}>
          {isEditMode ? 'Editar' : 'Publicar'}
        </button>
      </form>

      <Select defaultValue={currentFilter}
        onChange={handleStatusFilterChange}
        options={STATUS_LIST}
        hasEmptyOption={false}
      />
      
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
            category={item.category}
          />
        )
      })}
    </div>
  );
}

export default Home