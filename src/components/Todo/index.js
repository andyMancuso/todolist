const Todo = ({ text, deleteTodo, editTodo, isChecked, onCheck }) => {


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
        {' '}
        <button onClick={editTodo}>✏️</button>
      </div>
  );
}

export default Todo;
