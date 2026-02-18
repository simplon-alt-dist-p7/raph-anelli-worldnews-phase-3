import WorldNewsLogo from "../../assets/WorldNewsLogo.svg";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <img src={WorldNewsLogo} alt="World News Logo" className="header__logo" />
    </header>
  );
}

export default Header;
