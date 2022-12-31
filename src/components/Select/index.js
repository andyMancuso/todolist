const Selected = ({label, value}) => {

    return (
        <select>
            <option value={value}>{label}</option>
        </select>
    );
    
} 
export default Selected;