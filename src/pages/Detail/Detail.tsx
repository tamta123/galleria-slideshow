import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Next, Back } from "../../svg";
import ViewDiv from "../../components/Detail/ViewDiv";

interface ArtistItem {
  id: number;
  hero_small: string;
  name: string;
  artist_photo: string;
  artist_name: string;
  description: string;
  source: string;
}

const Detail: React.FC = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const [artistData, setArtistData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ArtistItem>(
          `https://gallerianode-production.up.railway.app/artist/${artistId}`
        );
        setArtistData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [artistId]);

  if (!artistData) {
    return <div>Loading...</div>;
  }

  return (
    <Card key={artistData.id}>
      <Wrapper>
        <AroundImage>
          <div style={{ height: "auto", width: "327px" }}>
            <Image src={artistData.hero_s} alt={artistData.name} />
          </div>
          <ViewDiv />
          <AboutArtist>
            <Name>{artistData.name}</Name>
            <Artist>{artistData.artist_name}</Artist>
          </AboutArtist>
        </AroundImage>
        <Photo src={artistData.artist_photo} alt={artistData.artist_name} />
        <Description>{artistData.description}</Description>
        <Source
          href={artistData.source}
          target="_blank"
          rel="noopener noreferrer"
        >
          GO TO SOURCE
        </Source>
      </Wrapper>
      <FooterElement>
        <ArtistInfo>
          <FooterName>{artistData.name}</FooterName>
          <FooterArtist>{artistData.artist_name}</FooterArtist>
        </ArtistInfo>
        <Arrows>
          <Back />
          <Next />
        </Arrows>
      </FooterElement>
    </Card>
  );
};

export default Detail;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
`;

const Wrapper = styled.div`
  padding: 24px;
  padding-bottom: 67px;
`;

const AroundImage = styled.div`
  position: relative;
`;

const AboutArtist = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 11px;
  height: auto;
  width: 280px;
  bottom: -54px;
  background-color: white;
  z-index: 99;
  position: absolute;
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const Name = styled.p`
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 29px;
`;

const Photo = styled.img`
  height: 64px;
  width: 64px;
  margin-bottom: 54px;
  margin-top: 54px;
`;

const Artist = styled.p`
  color: #7d7d7d;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Description = styled.div`
  color: #7d7d7d;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  margin-bottom: 64px;
`;

const Source = styled.a`
  color: #7d7d7d;
  font-size: 9px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1.929px;
  text-decoration-line: underline;
`;

const FooterElement = styled.footer`
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
