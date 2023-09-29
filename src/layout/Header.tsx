import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../components";
import { useContext, useEffect, useState } from "react";
import { Logo } from "../svg";

const Header = () => {
  const data = useContext(DataContext);
  const [slideshowStarted, setSlideshowStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(1);
  const navigate = useNavigate();

  if (data === null) {
    return <div>Loading...</div>;
  }

  const toggleSlideshow = () => {
    setSlideshowStarted((prev) => !prev);
  };
  const nextIndex = currentIndex + 1;

  useEffect(() => {
    if (slideshowStarted) {
      const slideshowInterval = setInterval(() => {
        console.log(currentIndex, "currentIndex");
        console.log(nextIndex, "nextIndex");
        setCurrentIndex(nextIndex);

        if (nextIndex >= data.length) {
          setCurrentIndex(1);
        }

        // Move navigate() call here
        navigate(`/Detail/${nextIndex}`);
      }, 2000);

      return () => {
        clearInterval(slideshowInterval);
      };
    }
  }, [slideshowStarted, currentIndex, data, navigate]);

  const stopSlideshowAndNavigateHome = () => {
    setSlideshowStarted(false);
    navigate("/");
  };

  return (
    <HeaderElement>
      <Link to="/" onClick={stopSlideshowAndNavigateHome}>
        <Logo />
      </Link>
      <H2>
        <Link
          to={`/Detail/${currentIndex}`}
          style={{ textDecoration: "none", color: "#7d7d7d" }}
          onClick={toggleSlideshow}
        >
          {slideshowStarted ? "STOP SLIDESHOW" : "START SLIDESHOW"}
        </Link>
      </H2>
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
  text-align: right;
  font-size: 9px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1.929px;
`;
