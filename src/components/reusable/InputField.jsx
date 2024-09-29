import { useRef } from "react";
import { LuUpload } from "react-icons/lu";

const ReusableInput = ({
  label,
  type = "text",
  value,
  onChange,
  options = [], // for select input options
  error = false,
  helperText = "",
  required = false,
  fullWidth = true,
  placeholder = "",
  ...props
}) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={`mb-4 ${fullWidth ? "w-full" : "w-auto"}`}>
      <label className="block text-sm font-medium tracking-wide mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {type === "file" ? (
        <div className="flex flex-col items-center py-6 gap-y-3 border-2 rounded-lg border-dashed border-gray-300 bg-[#FAFAFB]">
          <input
            type="file"
            onChange={onChange}
            required={required}
            accept="jpeg, jpg, pdf"
            ref={fileInputRef}
            className={`w-full text-sm px-2 py-2 rounded-lg hidden ${
              error ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-0 focus:ring-[#E6E7EA]`}
            {...props}
          />
          <button
            onClick={handleClick}
            className="font-semibold flex flex-row justify-center items-center gap-x-2 py-4 px-4 border-2 border-custom-blue text-custom-blue rounded-lg"
          >
            <span>
              <LuUpload size={20} />
            </span>
            Upload Documents
          </button>
          <p className="text-gray-400 font-medium text-sm">
            Size: 10MB, Format: PDF, JPEG, JPG
          </p>
        </div>
      ) : type === "select" ? (
        <select
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full text-sm px-2 text-gray-400 py-2 rounded-lg border-[2px] border-[#E6E7EA] bg-[#FAFAFB] ${
            error ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-0 focus:ring-[#E6E7EA]`}
          {...props}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="text-gray-400"
            >
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`w-full text-sm px-2 py-2 rounded-lg border-[2px] border-[#E6E7EA] bg-[#FAFAFB] ${
            error ? "border-red-500" : "border-gray-300"
          } focus:outline-none focus:ring-0 focus:ring-[#E6E7EA]`}
          {...props}
        />
      )}

      {helperText && (
        <p
          className={`text-sm mt-1 ${error ? "text-red-500" : "text-gray-500"}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default ReusableInput;
