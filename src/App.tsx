import styled from "styled-components";
import Routing from "./components/Routing";

function App() {
  return (
    <Main>
      <Routing />
    </Main>
  );
}

export default App;

const Main = styled.main`
  background-color: #fff;
  width: 100%;
  height: 100%;
`;
