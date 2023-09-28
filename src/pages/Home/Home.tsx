import styled from "styled-components";
import { Link } from "react-router-dom";
import { DataContext } from "../../components";
import { useContext } from "react";

interface GalleryItems {
  id: number;
  thumbnail: string;
  name: string;
  artist_name: string;
}
const Home: React.FC = () => {
  return (
    <Container>
      <DataContext.Consumer>
        {(data: GalleryItems[] | null) =>
          data &&
          data.map((item, index) => (
            <Link to={`/Detail/${item.id}`} key={item.id}>
              <Card key={index}>
                <Image src={item.thumbnail} alt={item.name} />
                <Name>{item.name}</Name>
                <Artist>{item.artist_name}</Artist>
              </Card>
            </Link>
          ))
        }
      </DataContext.Consumer>
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
