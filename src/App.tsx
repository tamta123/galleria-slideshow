import styled from "styled-components";
import Routing from "./components/Routing";
import Header from "./layout/Header";
import { useContext } from "react";
import { DataContext } from "./components/DataContext";

function App() {
  const data = useContext(DataContext);

  return (
    <Main>
      <Wrapper>
        {data && <Header />}
        <Routing />
      </Wrapper>
    </Main>
  );
}

export default App;

const Main = styled.main`
  background-color: #fff;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div``;
