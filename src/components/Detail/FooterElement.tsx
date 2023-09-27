import styled from "styled-components";
import { Next, Back } from "../../svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface FooterElementProps {
  name: string;
  artist_name: string;
  artistId: string;
  isFirstArtist: number;
  isLastArtist: number;
  next: number;
  previous: number;
  data: any[];
  currentIndex: number;
}

const FooterElement: React.FC<FooterElementProps> = ({
  name,
  artist_name,
  next,
  previous,
  isFirstArtist,
  isLastArtist,
  data,
  currentIndex,
}) => {
  const [lineLength, setLineLength] = useState<string>("0%");

  useEffect(() => {
    if (data.length > 0) {
      const percentage = (currentIndex / (data.length - 1)) * 100;
      setLineLength(percentage + "%");
    }
  }, [currentIndex, data]);

  return (
    <Wrapper>
      <BorderLine style={{ width: lineLength }} />
      <ArtistInfo>
        <FooterName>{name}</FooterName>
        <FooterArtist>{artist_name}</FooterArtist>
      </ArtistInfo>
      <Arrows>
        <Link to={`/Detail/${previous}`}>
          <div
            style={{
              opacity: isFirstArtist ? 0.2 : 1,
              pointerEvents: isFirstArtist ? "none" : "auto",
            }}
          >
            <Back />
          </div>
        </Link>
        <Link to={`/Detail/${next}`}>
          <div
            style={{
              opacity: isLastArtist ? 0.2 : 1,
              pointerEvents: isLastArtist ? "none" : "auto",
            }}
          >
            <Next />
          </div>
        </Link>
      </Arrows>
    </Wrapper>
  );
};

export default FooterElement;

const Wrapper = styled.footer`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 16px;
  padding-inline: 24px;
  border-top: 1px solid #e5e5e5;
  overflow: hidden; /* Hide overflow to prevent line from overflowing */
`;

const ArtistInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Arrows = styled.div`
  display: flex;
  gap: 25px;
`;

const FooterName = styled.p`
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const FooterArtist = styled.p`
  color: #000;
  font-family: Libre Baskerville;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const BorderLine = styled.div`
  height: 2px;
  background-color: #000;
  position: absolute;
  top: 0;
  left: 0;
  transition: width 0.3s ease; /* Add a transition for smooth width changes */
`;
