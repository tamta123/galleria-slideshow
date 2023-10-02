import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { DataContext } from "../../components";
import { useContext } from "react";

interface GalleryItems {
  id: number;
  thumbnail: string;
  name: string;
  artist_name: string;
}
const Home: React.FC = () => {
  const data = useContext<GalleryItems[] | null>(DataContext);

  return (
    <Container>
      {data &&
        data.map((item, index) => (
          <Link to={`/Detail/${item.id}`} key={item.id}>
            <Card key={index}>
              <Hover></Hover>
              <Image src={item.thumbnail} alt={item.name} />
              <Name>{item.name}</Name>
              <Artist>{item.artist_name}</Artist>
            </Card>
          </Link>
        ))}
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    /* flex-direction: row; */
    flex-wrap: wrap;
    max-height: 3300px;
  }
  @media (min-width: 1440px) {
    max-height: 1600px;
  }
  @media (min-width: 1800px) {
    max-height: 2000px;
  }
`;

const Link = styled(RouterLink)`
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
  @media (min-width: 768px) {
    width: 48%;
  }
  @media (min-width: 1440px) {
    width: 22%;
  }
`;

const Hover = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.5) 0%,
      rgba(255, 255, 255, 0.5) 100%
    ),
    url(<path-to-image>) lightgray 50% / cover no-repeat;
  z-index: 999;
  display: none;
`;

const Card = styled.div`
  position: relative;
  &:hover {
    ${Hover} {
      display: block;
      opacity: 0.5;
    }
  }

  @media (min-width: 768px) {
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const Name = styled.p`
  color: #fff;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  position: absolute;
  bottom: 56px;
  padding-left: 32px;
  padding-right: 49px;
  text-align: left;
`;

const Artist = styled.p`
  color: #fff;
  font-family: Libre Baskerville;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: absolute;
  bottom: 33px;
  padding-left: 32px;
  padding-right: 49px;
  text-align: left;
`;
