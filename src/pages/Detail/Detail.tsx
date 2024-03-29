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
  next: number;
  previous: number;
}
const Detail: React.FC = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const [artistData, setArtistData] = useState<any>(null);
  const data = useContext(DataContext);

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

  if (data === null || artistData === null) {
    return <div>Loading...</div>;
  }

  const currentIndex = data.findIndex(
    (item) => item.id.toString() === artistId
  );
  const nextIndex = currentIndex < data.length - 1 ? currentIndex + 1 : -1;
  const previousIndex = currentIndex > 0 ? currentIndex - 1 : -1;

  const next = nextIndex !== -1 ? data[nextIndex].id : -1;
  const previous = previousIndex !== -1 ? data[previousIndex].id : -1;

  const isFirstArtist = currentIndex === 0;
  const isLastArtist = currentIndex === data.length - 1;

  return (
    <Card key={artistData.id}>
      <Wrapper>
        <IntroDiv>
          <AroundImage>
            <ImageWrapper>
              <Image src={artistData.hero_s} alt={artistData.name} />
              <ImageTablet src={artistData.hero_l} alt={artistData.name} />
            </ImageWrapper>
            <ViewDiv imageSrc={artistData.gallery} />
            <AboutArtist>
              <Name>{artistData.name}</Name>
              <Artist>{artistData.artist_name}</Artist>
            </AboutArtist>
          </AroundImage>
          <Photo src={artistData.artist_photo} alt={artistData.artist_name} />
        </IntroDiv>
        <DescriptionDiv>
          <Description>{artistData.description}</Description>
          <Source
            href={artistData.source}
            target="_blank"
            rel="noopener noreferrer"
          >
            GO TO SOURCE
          </Source>
        </DescriptionDiv>
      </Wrapper>

      <FooterElement
        name={artistData.name}
        artist_name={artistData.artist_name}
        artistId={artistId as string}
        isFirstArtist={isFirstArtist}
        isLastArtist={isLastArtist}
        next={next}
        previous={previous}
        data={data}
        currentIndex={currentIndex}
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
  display: flex;
  flex-direction: column;
  padding: 24px;
  padding-bottom: 68px;
  @media (min-width: 768px) {
    padding: 40px;
    align-items: center;
  }
  @media (min-width: 1440px) {
    flex-direction: row;
    padding: 100px 40px 75px 40px;
    gap: 18%;
    margin-bottom: 75px;
  }
`;

const IntroDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
  margin-bottom: 54px;
  align-items: flex-start;
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 30px;
    align-items: center;
  }
  @media (min-width: 1440px) {
    width: auto;
    align-items: flex-end;
    margin-bottom: 0;
  }
`;

const ImageWrapper = styled.div`
  min-width: 327px;
  min-height: 327px;
  @media (min-width: 768px) {
    min-width: 475px;
    min-height: 560px;
  }
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
  bottom: -54px;
  background-color: white;
  z-index: 99;
  position: absolute;
  @media (min-width: 768px) {
    width: 445px;
    top: 0;
    left: 243px;
    height: 250px;
    padding: 0px 0px 67px 65px;
    gap: 25px;
  }
  @media (min-width: 768px) {
    top: 0;
    left: 410px;
  }
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  @media (min-width: 768px) {
    display: none;
  }
`;

const ImageTablet = styled.img`
  object-fit: cover;
  width: 475px;
  height: auto;
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
`;

const Name = styled.p`
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 29px;
  @media (min-width: 768px) {
    font-size: 56px;
    line-height: 64px;
    width: 90%;
  }
`;

const Photo = styled.img`
  height: 64px;
  width: 64px;
  margin-top: 54px;
  @media (min-width: 768px) {
    height: 128px;
    width: 128px;
  }
  @media (min-width: 1440px) {
    margin-bottom: -68px;
  }
`;

const Artist = styled.p`
  color: #7d7d7d;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const DescriptionDiv = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    width: 67%;
  }
  @media (min-width: 1440px) {
    width: 30%;
  }
`;

const Description = styled.div`
  color: #7d7d7d;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  padding-bottom: 68px;
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
