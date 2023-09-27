import styled from "styled-components";
import Routing from "./components/Routing";
import Header from "./layout/Header";
import { DataProvider } from "./components/DataContext";

function App() {
  return (
    <DataProvider>
      <Main>
        <Wrapper>
          <Header />
          <Routing />
        </Wrapper>
      </Main>
    </DataProvider>
  );
}

export default App;

const Main = styled.main`
  background-color: #fff;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div``;
