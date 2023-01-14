const Select = ({value, key, options, onChange}) => {

  return (
    <select onChange={onChange}>
      {
        options.map(opt => (
          <option value={opt.value} key={opt.key}>{opt.value}</option>

        )
        )
      }
    </select>

  );
        
} 
export default Select;
    
    