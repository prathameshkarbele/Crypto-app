const SelectButton = ({ children, onClick }) => {
  
    return (
      <span onClick={onClick} className="SelectButton">
        {children}
      </span>
    );
  };
  
  export default SelectButton;