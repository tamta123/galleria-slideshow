import styled from "styled-components";
import { Next, Back } from "../../svg";
import { Link } from "react-router-dom";

interface FooterElementProps {
  name: string;
  artist_name: string;
  artistId: number;
  totalArtists: number;
}

const FooterElement: React.FC<FooterElementProps> = ({
  name,
  artist_name,
  artistId,
  totalArtists,
}) => {
  const next = artistId + 1;
  const previous = artistId - 1;

  const isLastArtist = artistId === totalArtists;
  const isFirstArtist = artistId === 1;

  const nextArrowOpacity = isLastArtist ? 0.2 : 1;
  const firstArrowOpacity = isFirstArtist ? 0.2 : 1;

  return (
    <Wrapper>
      <ArtistInfo>
        <FooterName>{name}</FooterName>
        <FooterArtist>{artist_name}</FooterArtist>
      </ArtistInfo>
      <Arrows>
        <Link to={`/Detail/${previous}`}>
          <Back style={{ opacity: firstArrowOpacity }} />
        </Link>
        <Link to={`/Detail/${next}`}>
          <Next style={{ opacity: nextArrowOpacity }} />
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
  border-top: 2px solid #e5e5e5;
  padding-top: 17px;
  padding-bottom: 17px;
  padding-inline: 24px;
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
