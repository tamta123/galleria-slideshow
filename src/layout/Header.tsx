import styled from "styled-components";
import { Logo } from "../svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <HeaderElement>
      <Link to="/">
        <img src="../../public/logo.svg" alt="logo" />
        {/* <Logo /> */}
      </Link>
      <Link to="/Detail" style={{ textDecoration: "none" }}>
        <H2>START SLIDESHOW</H2>
      </Link>
    </HeaderElement>
  );
};

export default Header;

const HeaderElement = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 2px solid #e5e5e5;
`;

const H2 = styled.h2`
  color: #7d7d7d;
  text-align: right;
  font-size: 9px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1.929px;
`;
