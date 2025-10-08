const PasswordGuide = ({ password }) => {
  if (!password) return null;

  return (
    <div className="text-xs mt-2 space-y-1">
      <p className={password.length >= 8 ? "text-green-600" : "text-red-600"}>
        • At least 8 characters
      </p>
      <p className={/[A-Z]/.test(password) ? "text-green-600" : "text-red-600"}>
        • One uppercase letter
      </p>
      <p className={/[a-z]/.test(password) ? "text-green-600" : "text-red-600"}>
        • One lowercase letter
      </p>
      <p className={/\d/.test(password) ? "text-green-600" : "text-red-600"}>
        • One number
      </p>
      <p
        className={
          /[!@#$%^&*(),.?":{}|<>]/.test(password)
            ? "text-green-600"
            : "text-red-600"
        }
      >
        • One special character
      </p>
    </div>
  );
};

export default PasswordGuide;
