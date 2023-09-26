import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface GalleryItems {
  id: number;
  thumbnail: string;
  name: string;
  artist_name: string;
}

const Home: React.FC = () => {
  const [data, setData] = useState<GalleryItems[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<GalleryItems[]>(
          "https://gallerianode-production.up.railway.app/"
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      {data.map((item, index) => (
        <Link to={`/Detail/${item.id}`} key={index}>
          <Card key={index}>
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
  display: grid;
  grid-template-columns: 1;
  gap: 24px;
  padding: 24px;
`;
const Card = styled.div`
  position: relative;
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
