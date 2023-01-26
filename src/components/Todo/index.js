const Todo = ({ text, deleteTodo, editTodo, isChecked, favoriteTodo, isImportant, onCheck, category }) => {


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
        <button 
        onClick={favoriteTodo}
        clicked={isImportant}
        >{isImportant ? '🟡' : '🟣'}</button>
        {' '}
        <span style={{textDecoration: isChecked ? 'line-through' : 'unset' }}>
          {text} {category ? `(${category})` : '' }
        </span>
        {' '}
        <button onClick={deleteTodo}>X</button>
        {' '}
        <button onClick={editTodo}>✏️</button>
      </div>
  );
}

export default Todo;
