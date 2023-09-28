import styled from "styled-components";
import { Link } from "react-router-dom";
import { DataContext } from "../components";
import { useContext, useEffect, useState } from "react";
import { Logo } from "../svg";

const Header = () => {
  const [slideshowStarted, setSlideshowStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // Initialize currentIndex with 0
  const data = useContext(DataContext);

  if (data === null) {
    return <div>Loading...</div>;
  }

  // Function to start the slideshow
  const startSlideshow = () => {
    console.log(data, "data");

    if (!slideshowStarted) {
      setSlideshowStarted(true);
      const slideshowInterval = setInterval(() => {
        // Calculate the index of the next detail page
        const nextIndex = (currentIndex + 1) % data.length;
        // Update current index using setCurrentIndex
        setCurrentIndex(nextIndex);
      }, 5000);

      return () => {
        clearInterval(slideshowInterval);
      };
    }
  };

  useEffect(() => {
    startSlideshow();
    return () => {
      // Cleanup effect
    };
  }, []);

  return (
    <HeaderElement>
      <Link to="/">
        <Logo />
      </Link>
      <H2>
        <Link to={`/Detail/${currentIndex}`} style={{ textDecoration: "none" }}>
          START SLIDESHOW
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
  color: #7d7d7d;
  text-align: right;
  font-size: 9px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1.929px;
`;
