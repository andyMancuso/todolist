import { useState } from 'react'

const Category = ({ name , onEdit, onRemove}) => {

  const [isEdit, setIsEdit] = useState (false)

  const [inputValue, setInputValue] = useState(name)

  const toggleEdit = () => {
    // if (isEdit) setIsEdit(false)
    // else setIsEdit(true)
    setIsEdit(prev => !prev)

  }

  const handleChange = (e) => setInputValue(e.target.value)

  const save = (e) => {
    e.preventDefault()
    onEdit({ old: name, current: inputValue })
  } 
    

  const remove = () => onRemove(name)


  return (
    <form onSubmit={save}>
      {isEdit ? <input autoFocus value={inputValue} onChange={handleChange}/> : name}
      {' '}
      {isEdit 
        ? <button>💾</button>
        : <button onClick={toggleEdit}>✏️</button>
      }
      {' '}
      <button type='button' onClick={remove}>X</button>
    </form>
  )
}

export default Category