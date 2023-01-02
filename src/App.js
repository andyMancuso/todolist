import { useState, useEffect } from 'react';
import Selected from './components/Select';
import Todo from './components/Todo'


const App = () => {

  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('listita')) || [])

  useEffect (() => {
    window.localStorage.setItem('listita', JSON.stringify(todos))
    console.log(todos)
  }, [todos])

  const [inputValue, setInputValue] = useState('')

  const [currentFilter, setCurrentFilter] = useState('')

  useEffect(() => {
    console.log(currentFilter)
  }, [currentFilter])

  const [isEditMode, setIsEditMode] = useState(false)

  const [editingIdx, setEditingIdx] = useState()

  const [defaultCategories, setDefaultCategories] = useState(JSON.parse(localStorage.getItem('newList')) || [

  ])

  useEffect (() => {
    window.localStorage.setItem('newList', JSON.stringify(defaultCategories))
    
  }, [defaultCategories])
    
  //   [
  //   { value: 'Todas', label: 'Todas', key: 'Todas' },
  //   { value: 'Pendientes', label: 'Pendientes', key: 'Pendientes'  },
  //   { value: 'Completadas', label: 'Completadas', key: 'Completadas' },
  //   { value: 'Importantes', label: 'Importantes', key: 'Importantes' }
  // ]

  const [categoryInput, setCategoryInput] = useState('')

  const [isCategoryEdit, setIsCategoryEdit] = useState(false)

  const [editCategoryIdx, setEditCategoryIdx] = useState()



  const filterFn = (item) => {
    
    if(currentFilter === 'Todas') {
      return item
    }

    if (currentFilter === 'Completadas') {
      return item.checked === true
    }

    if (currentFilter === 'Pendientes') {
      return item.checked === false
    }

    if (currentFilter === 'Importantes') {
      return item.favorited === true
    } 
    
    else {
      return item.category === currentFilter
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
        category: currentFilter
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

    const importantIdx = todos.findIndex(item => item === itemClicked)
    const importantItem = todos[importantIdx]

    const newImportant = {...importantItem}

    newImportant.favorited = !newImportant.favorited

    const prevTodos = todos.slice(0, importantIdx)
    const nextTodos = todos.slice(importantIdx+1, todos.length)

    const newTodos = [...prevTodos, newImportant, ...nextTodos]

    setTodos(newTodos)
  }

  const handleCategoryChange = (e) => {
    const newText = e.target.value
    setCategoryInput(newText)
  }

  const handleCategorySubmit = (e) => {
    e.preventDefault()



    if (categoryInput === '') {
      alert('Por favor ingrese el nombre de la categoría c:')
      return
    }

    if (!isCategoryEdit) {

      const alreadyExist = defaultCategories.some(item => categoryInput === item.key)

      if (alreadyExist) {
        alert('La categoría intentas agregar ya existe en la lista')
        return
      }

      const newCategory = {
        value: categoryInput,
        label: categoryInput,
        key: categoryInput
      }
      const newList = [...defaultCategories, newCategory]
      setDefaultCategories(newList)
      setCategoryInput('')
      
      localStorage.setItem('newList', JSON.stringify(newList));
      
    } 
    
    else {
      const editedCategory = defaultCategories[editCategoryIdx]
      const editCategoryIdx = defaultCategories.findIndex(item => item.value === currentFilter)
      const editingCategory = defaultCategories[editCategoryIdx]
      
      editedCategory.value = categoryInput
      
      // editingCategory = {
      //   value: categoryInput,
      //   label: categoryInput,
      //   key: categoryInput
      // }
      
      // newCategory.value = categoryInput
      // newCategory.label = categoryInput
      // newCategory.key = categoryInput

      const prevCategories = defaultCategories.slice(0, editCategoryIdx)
      const nextCategories = defaultCategories.slice(editCategoryIdx + 1, todos.length)

      const newCategories = [...prevCategories, editedCategory, ...nextCategories]
      setDefaultCategories(newCategories)
      
      setIsCategoryEdit(false)
      setCategoryInput('')
      
    }
  }

  const deleteCategory = () => {

    const newCategories = defaultCategories.filter(item => item.key !== currentFilter)
    setDefaultCategories(newCategories)

    const deleteCategoryTodos = todos.filter(item => item.category !== currentFilter)

    setTodos(deleteCategoryTodos)

  // borrar última categoría

  }

  const editCategory = () => {
    setIsCategoryEdit(true)
    setCategoryInput(currentFilter)

  }

  return (
    <div>

      <h1>
        Todo's Mancussi
      </h1>
  
      
      <select onChange={handleSelectChange}>
      {defaultCategories.map(item => {
        return(
          <Selected
          label={item.value}
          value={item.value}
          key={item.value}
          />
        )
      })}
      </select>
      {' '}
      <button onClick={deleteCategory}>X</button>

      <form onSubmit={handleCategorySubmit}>
       <input
       value={categoryInput}
       onChange={handleCategoryChange}
       placeholder='Ingresar nombre categoría...'
       />
       <button onClick={handleCategorySubmit}>{isCategoryEdit ? 'Editar' : 'Crear'}</button>
      </form>
       <button onClick={editCategory}>✏️</button>


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
            category={item.category}
          />
        )
      })}
    </div>
  );
}

export default App;