import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import ViewDiv from "../../components/Detail/ViewDiv";
import FooterElement from "../../components/Detail/FooterElement";
import { useContext } from "react";
import { DataContext } from "../../components";

interface ArtistItem {
  id: number;
  hero_small: string;
  name: string;
  artist_photo: string;
  artist_name: string;
  description: string;
  source: string;
  gallery: string;
  totalArtists: number;
  next: number;
  previous: number;
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
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [artistId]);

  const data = useContext(DataContext);

  if (data === null) {
    return <div>Loading...</div>;
  }
  console.log(data, "data");

  const currentIndex = data.findIndex(
    (item) => item.id.toString() === artistId
  );
  const nextIndex = currentIndex < data.length - 1 ? currentIndex + 1 : -1;
  const previousIndex = currentIndex > 0 ? currentIndex - 1 : -1;

  const next = nextIndex !== -1 ? data[nextIndex].id : null;
  const previous = previousIndex !== -1 ? data[previousIndex].id : null;

  const isFirstArtist = currentIndex === 0;
  const isLastArtist = currentIndex === data.length - 1;

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
          <ViewDiv imageSrc={artistData.gallery} />
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
      <FooterElement
        name={artistData.name}
        artist_name={artistData.artist_name}
        artistId={artistId as string}
        isFirstArtist={isFirstArtist}
        isLastArtist={isLastArtist}
        next={next}
        previous={previous}
      />
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
