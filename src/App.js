import { DragDropContext } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atom";
import Board from "./Components/Board";
import { useForm } from "react-hook-form";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;
const Outsidewrap = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Inputwrap = styled.div`
  position: relative;
  left: 100px;
  width: 30%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 30px;
  span {
    font-weight: 600;
    margin-bottom: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;
  input {
    width: 70%;
    height: 30px;
    border-radius: 5px;
    outline: none;
    border: 0;
  }
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm();
  const onValid = ({ board }) => {
    setToDos((boards) => {
      return {
        ...boards,
        [board]: [],
      };
    });
    setValue("board", "");
  };
  const onDragEnd = (info) => {
    const { destination, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setToDos((allBoard) => {
        const boardCopy = [...allBoard[source.droppableId]];
        const taskObject = boardCopy[source.index];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, taskObject);
        return {
          ...allBoard,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if (destination.droppableId !== source.droppableId) {
      setToDos((allBoard) => {
        const sourceBoard = [...allBoard[source.droppableId]];
        const taskObject = sourceBoard[source.index];
        const destinationBoard = [...allBoard[destination.droppableId]];
        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, taskObject);
        return {
          ...allBoard,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Outsidewrap>
        <Inputwrap>
          <span>Custom your Board</span>
          <Form onSubmit={handleSubmit(onValid)}>
            <input
              {...register("board", { required: true })}
              type="text"
              placeholder={"Add Board"}
            />
          </Form>
        </Inputwrap>
      </Outsidewrap>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
