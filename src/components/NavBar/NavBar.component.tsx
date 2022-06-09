import { Link } from "react-router-dom";
import ButtonWrapper from "../../templates/ButtonWrapper.template";

function NavBar() {
  return (
    <header className="header py-4">
      <div className="container mx-auto">
        <nav className="nav">
          <ul className="nav-list flex justify-between">
            <li className="nav-list__item">Logo</li>
            <li className="nav-list__item flex justify-between basis-1/2">
              <Link to="/">
                <ButtonWrapper>Home</ButtonWrapper>
              </Link>
              <Link to="/posts">
                <ButtonWrapper>Posts</ButtonWrapper>
              </Link>
              <Link to="/">
                <ButtonWrapper>other links</ButtonWrapper>
              </Link>
              <Link to="/">
                <ButtonWrapper>other links</ButtonWrapper>
              </Link>
              <Link to="/">
                <ButtonWrapper>other links</ButtonWrapper>
              </Link>
              <Link to="/">
                <ButtonWrapper>other links</ButtonWrapper>
              </Link>
            </li>
            <li className="nav-list__item flex justify-between basis-1/6">
              <ButtonWrapper as={"a"} href="#">
                Log In
              </ButtonWrapper>
              <ButtonWrapper
                as={"a"}
                href="#"
                className="nav-list__reg"
              >
                Regstrate
              </ButtonWrapper>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
