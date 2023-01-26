import { useState } from 'react'
import Category from '../../components/Category'



const Categories = ({ categoriesList, setCategoriesList }) => {
  
  const [inputValue, setInputValue] = useState ('')

  const handleSubmitChange = (e) => {
    setInputValue(e.target.value)
  }

  const add = (e) => {
    e.preventDefault()

    const newCategories = [...categoriesList, inputValue]

    setCategoriesList(newCategories)
    setInputValue('')
  }

  const edit = ({ old, current }) => {

    const editingIdx = categoriesList.findIndex(item => item === old)
   
    const categoryEdited = current

    const prevTodos = categoriesList.slice(0, editingIdx)
    const nextTodos = categoriesList.slice(editingIdx + 1, categoriesList.length)

    const newTodos = [...prevTodos, categoryEdited, ...nextTodos]
    setCategoriesList(newTodos)

    setInputValue('')

  }

  const remove = (name) => {
    const newCategoryList = categoriesList.filter(item => item !== name)
    setCategoriesList(newCategoryList)
  }

  return (
    <>
      {' '}
      <form onSubmit={add}>
        <input
          value={inputValue}
          onChange={handleSubmitChange}
        />
        <button>Add</button>
      </form>


      {categoriesList.map(item => {
        return (
          <Category
            name={item}
            key={item}
            onEdit={edit}
            onRemove={remove}
          />
        )
      })
      }
    </>
  )
}

export default Categories