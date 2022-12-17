import { useState } from "react";


const Todo = ({ text, deleteTodo, isChecked, onCheck }) => {

  

  const handleChange = (e) => {
    onCheck(e.target.checked, text)
  }

  return (
      <div>
        <input 
          type='checkbox'
          checked={isChecked}
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