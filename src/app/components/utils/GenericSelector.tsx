type GenericSelectorProps = {
  label: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
};

const GenericSelector: React.FC<GenericSelectorProps> = ({
  label,
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <label htmlFor={label.toLowerCase()}>{label}:</label>
      <select
        id={label.toLowerCase()}
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-md"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenericSelector;
