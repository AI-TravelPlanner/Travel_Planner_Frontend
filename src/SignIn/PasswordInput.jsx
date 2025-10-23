import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({ value, onChange, placeholder = "Password" }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#4A1919] caret-[#4A1919]"
        value={value}
        onChange={onChange}
        required
      />
      <button
        type="button"
        className="absolute right-3 top-3 cursor-pointer"
        onMouseDown={() => setShow(true)}
        onMouseUp={() => setShow(false)}
        onMouseLeave={() => setShow(false)}
      >
        {show ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};

export default PasswordInput;
