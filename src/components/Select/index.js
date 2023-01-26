const Select = ({defaultValue, options, onChange, hasEmptyOption= true}) => {

  return (
    <select defaultValue={defaultValue} onChange={onChange}>
      {hasEmptyOption && (
        <option value={''}>Selecciona una categoria</option>
      ) }
      {
        options.map(opt => (
          <option value={opt.value} key={opt.value}>{opt.value}</option>

        )
        )
      }
    </select>

  );
        
} 
export default Select;
    
    