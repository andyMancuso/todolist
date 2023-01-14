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

  }

  const remove = () => {

  }

  return (
    <>
      {' '}
      <form>
        <input 
          value={inputValue}
          onChange={handleSubmitChange}
        />
        <button onClick={add}> Add</button>
      </form>


      {categoriesList.map(item => {
        return (
          <Category
            name={item}
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