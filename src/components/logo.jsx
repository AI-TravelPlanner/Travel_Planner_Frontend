import logo from "../assets/logo.png";

export default function Logo() {
  return (
    <img
      src={logo}
      alt="Logo"
      width={33}
      height={33}
      className="object-contain"
    />
  );
}

