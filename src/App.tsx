// import { useDispatch } from "react-redux"; // useSelector
// import { RootStateType } from "./redux/store";
import styled from "styled-components";
import Input from "./components/Input";
import Todolist from "./components/Todolist";

function App() {
  return (
    <StContainer>
      <header>
        <h1>Todolist</h1>
      </header>
      <StMain>
        <Input />
        <Todolist isWorking={true} />
        <Todolist isWorking={false} />
      </StMain>
    </StContainer>
  );
}

export default App;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 1rem;
  width: 1116px;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const StMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;

  & > :nth-child(3) {
    margin-top: 2rem;
  }
`;
