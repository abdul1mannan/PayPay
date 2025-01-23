"use client";

export const Select = ({
  options,
  onSelect,
  defaultValue,
  label,
  placeholder = "Select an option...",
}: {
  onSelect: (value: string) => void;
  options: {
    key: string;
    value: string;
  }[];
  defaultValue?: string;
  label?: string;
  placeholder?: string;
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor="select-component"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <select
        id="select-component"
        onChange={(e) => onSelect(e.target.value)}
        defaultValue={defaultValue || ""}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.key} value={option.key}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};
