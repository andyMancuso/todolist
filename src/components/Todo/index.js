import { useState } from "react";


const Todo = ({ text, deleteTodo }) => {

  const [isChecked, setIsChecked] = useState(false)

  const handleChange = (e) => {
    setIsChecked(e.target.checked)
  }

  return (
      <div>
        <input 
          type='checkbox'
          value={isChecked}
          onChange={handleChange}  
        />
        {' '}
        <span style={{textDecoration: isChecked ? 'line-through' : 'unset' }}>
          {text}
        </span>
        {' '}
        <button onClick={deleteTodo}>X</button>
      </div>
  );
}

export default Todo;
  
// text-decoration: line-through