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

  const save = () => onEdit({ old: name, current: inputValue })


  console.log(isEdit)
  return (
    <div>
      {isEdit ? <input autoFocus value={inputValue} onChange={handleChange}/> : name}
      {' '}
      {isEdit 
        ? <button onClick={save}>💾</button>
        : <button onClick={toggleEdit}>✏️</button>
      }
      {' '}
      <button onClick={onRemove}>X</button>
    </div>
  )
}

export default Category